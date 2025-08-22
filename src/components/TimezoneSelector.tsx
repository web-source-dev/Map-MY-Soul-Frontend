'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getTimezoneOptions, getCurrentTimezone, formatTimezoneOffset } from '@/lib/timezone';
import { ChevronDown, Clock, Search } from 'lucide-react';

interface TimezoneSelectorProps {
  value: number;
  onChange: (timezoneOffset: number) => void;
  label?: string;
  required?: boolean;
  showCurrent?: boolean;
}

export default function TimezoneSelector({ 
  value, 
  onChange, 
  label = "Timezone",
  required = false,
  showCurrent = true
}: TimezoneSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const timezoneOptions = getTimezoneOptions();
  const currentTimezone = getCurrentTimezone();

  // Enhanced search that looks for cities, countries, and UTC offsets
  const filteredOptions = timezoneOptions.filter(option => {
    const searchLower = searchQuery.toLowerCase();
    const labelLower = option.label.toLowerCase();
    const offsetStr = formatTimezoneOffset(option.value).toLowerCase();
    
    return labelLower.includes(searchLower) || 
           offsetStr.includes(searchLower) ||
           searchLower.includes('utc') ||
           searchLower.includes('gmt');
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery('');
      setSelectedIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const handleOptionSelect = (option: { value: number; label: string }) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchQuery('');
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
          handleOptionSelect(filteredOptions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchQuery('');
        setSelectedIndex(-1);
        break;
    }
  };

  const getSelectedLabel = () => {
    const selected = timezoneOptions.find(option => option.value === value);
    return selected?.label || 'Select timezone';
  };

  // Group timezones by region for better organization
  const groupTimezones = (options: typeof timezoneOptions) => {
    const groups: { [key: string]: typeof timezoneOptions } = {
      'Americas': [],
      'Europe & Africa': [],
      'Asia & Oceania': [],
      'Pacific': []
    };

    options.forEach(option => {
      if (option.value >= -8 && option.value <= -3) {
        groups['Americas'].push(option);
      } else if (option.value >= -1 && option.value <= 4) {
        groups['Europe & Africa'].push(option);
      } else if (option.value >= 5 && option.value <= 12) {
        groups['Asia & Oceania'].push(option);
      } else {
        groups['Pacific'].push(option);
      }
    });

    return groups;
  };

  const groupedOptions = groupTimezones(filteredOptions);

  return (
    <div className="relative" ref={dropdownRef}>
      <Label htmlFor="timezone-selector" className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <div className="relative">
        <Input
          ref={inputRef}
          id="timezone-selector"
          type="text"
          value={isOpen ? searchQuery : getSelectedLabel()}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          placeholder="Search timezones (e.g., 'New York', 'UTC+5', 'London')..."
          className="pr-10 cursor-pointer"
          readOnly={!isOpen}
          required={required}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          <Clock className="h-4 w-4 text-gray-400" />
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto">
          {showCurrent && (
            <div className="px-4 py-2 border-b border-gray-100 bg-blue-50">
              <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                Current Timezone
              </div>
              <div 
                className="px-2 py-1 mt-1 cursor-pointer hover:bg-blue-100 rounded flex items-center justify-between"
                onClick={() => handleOptionSelect({ value: currentTimezone.offset, label: `${formatTimezoneOffset(currentTimezone.offset)} (${currentTimezone.name})` })}
              >
                <span className="text-sm">
                  {formatTimezoneOffset(currentTimezone.offset)} ({currentTimezone.name})
                </span>
                <span className="text-xs text-blue-500 font-medium">Current</span>
              </div>
            </div>
          )}
          
          {searchQuery && (
            <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide flex items-center">
                <Search className="h-3 w-3 mr-1" />
                Search Results
              </div>
            </div>
          )}

          {Object.entries(groupedOptions).map(([region, options]) => {
            if (options.length === 0) return null;
            
            return (
              <div key={region}>
                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    {region}
                  </div>
                </div>
                {options.map((option, index) => (
                  <div
                    key={option.value}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${
                      index === selectedIndex ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <div className="text-sm font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatTimezoneOffset(option.value)}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {filteredOptions.length === 0 && searchQuery && (
            <div className="px-4 py-4 text-center">
              <div className="text-sm text-gray-500 mb-2">
                No timezones found matching &quot;{searchQuery}&quot;
              </div>
              <div className="text-xs text-gray-400">
                Try searching for a city name, country, or UTC offset
              </div>
            </div>
          )}

          {!searchQuery && (
            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
              <div className="text-xs text-gray-500 text-center">
                Type to search • {timezoneOptions.length} timezones available
              </div>
            </div>
          )}
        </div>
      )}

      {value !== undefined && !isOpen && (
        <div className="mt-1 text-xs text-gray-500">
          Selected: {formatTimezoneOffset(value)}
        </div>
      )}
    </div>
  );
}
