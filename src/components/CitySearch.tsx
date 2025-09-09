'use client';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import { searchCities, City } from '@/lib/cities-unified';

interface CitySearchProps {
  value: string;
  onChange: (city: string, timezoneOffset: number) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export default function CitySearch({ 
  value, 
  onChange, 
  placeholder = "Search for your birth city...", 
  label = "Birth City",
  required = false 
}: CitySearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setIsLoading(true);
      // Simulate a small delay for better UX
      const timer = setTimeout(() => {
        const results = searchCities(searchQuery);
        setSuggestions(results);
        setIsLoading(false);
        setIsOpen(results.length > 0);
        setSelectedIndex(-1);
      }, 150);
      
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    
    // If user clears the input, clear the selection
    if (!newValue) {
      onChange('', 0);
    }
  };

  const handleInputClick = () => {
    if (searchQuery.length >= 2 && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleCitySelect = (city: City) => {
    const cityString = `${city.name}, ${city.country}`;
    setSearchQuery(cityString);
    setIsOpen(false);
    setSelectedIndex(-1);
    onChange(cityString, city.timezoneOffset);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleCitySelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const formatPopulation = (population?: number): string => {
    if (!population) return '';
    if (population >= 1000000) {
      return `(${(population / 1000000).toFixed(1)}M)`;
    } else if (population >= 1000) {
      return `(${(population / 1000).toFixed(0)}K)`;
    }
    return `(${population})`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <Label htmlFor="city-search" className="text-sm font-medium">
          {label}
          {required && <span className="text-secondary-pop ml-1">*</span>}
        </Label>
      )}
      <div className="relative">
        <Input
          ref={inputRef}
          id="city-search"
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground/50"></div>
          ) : (
            <Search className="text-foreground/50 h-4 w-4" />
          )}
          <ChevronDown className="text-foreground/50 h-4 w-4" />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-foreground/20 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.length > 0 ? (
            <div>
              <div className="px-4 py-2 border-b border-foreground/10">
                <div className="text-xs font-medium text-foreground/60 uppercase tracking-wide">
                  Suggested Cities
                </div>
              </div>
              {suggestions.map((city, index) => (
                <div
                  key={`${city.name}-${city.country}`}
                  className={`px-4 py-3 cursor-pointer hover:bg-foreground/5 ${
                    index === selectedIndex ? 'bg-foreground/10' : ''
                  }`}
                  onClick={() => handleCitySelect(city)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {city.name}
                      </div>
                      <div className="text-xs text-foreground/60">
                        {city.country} {formatPopulation(city.population)}
                      </div>
                    </div>
                    <div className="text-xs text-foreground/50">
                      UTC{city.timezoneOffset >= 0 ? '+' : ''}{city.timezoneOffset}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery.length >= 2 && !isLoading ? (
            <div className="px-4 py-3 text-sm text-foreground/60">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>No cities found. Try a different search term.</span>
              </div>
              <div className="mt-2 text-xs text-foreground/50">
                You can still type any city name and we&apos;ll use OpenStreetMap to find coordinates.
              </div>
            </div>
          ) : null}
        </div>
      )}

      {value && !isOpen && (
        <div className="mt-1 text-xs text-foreground/60">
          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3" />
            <span>Selected: {value}</span>
          </div>
        </div>
      )}
    </div>
  );
}
