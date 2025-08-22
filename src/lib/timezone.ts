export interface TimezoneInfo {
  offset: number; // UTC offset in hours
  name: string;
  abbreviation: string;
}

export const getCurrentTimezone = (): TimezoneInfo => {
  if (typeof window === 'undefined') {
    return { offset: 0, name: 'UTC', abbreviation: 'UTC' };
  }

  const now = new Date();
  const offset = -now.getTimezoneOffset() / 60; // Convert minutes to hours
  const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Get timezone abbreviation
  const formatter = new Intl.DateTimeFormat('en', {
    timeZoneName: 'short',
    timeZone: timezoneName
  });
  const parts = formatter.formatToParts(now);
  const abbreviation = parts.find(part => part.type === 'timeZoneName')?.value || 'UTC';

  return {
    offset,
    name: timezoneName,
    abbreviation
  };
};

export const convertLocalToUTC = (
  localDate: string,
  localTime: string,
  timezoneOffset: number
): Date => {
  // Parse local date and time
  const [year, month, day] = localDate.split('-').map(Number);
  const [hour, minute] = localTime.split(':').map(Number);
  
  // Create a Date object in local time
  const localDateTime = new Date(year, month - 1, day, hour, minute, 0);
  
  // Convert to UTC by subtracting the timezone offset
  const utcTime = new Date(localDateTime.getTime() - (timezoneOffset * 60 * 60 * 1000));
  
  return utcTime;
};

export const formatTimeForDisplay = (time: string, timezoneOffset: number): string => {
  if (!time) return '';
  
  const [hour, minute] = time.split(':').map(Number);
  const localTime = new Date();
  localTime.setHours(hour, minute, 0, 0);
  
  // Convert to UTC
  const utcTime = new Date(localTime.getTime() - (timezoneOffset * 60 * 60 * 1000));
  
  // Format for display
  return utcTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });
};

export const getTimezoneOptions = (): { value: number; label: string }[] => {
  return [
    // UTC-12 to UTC-8 (Pacific regions)
    { value: -12, label: 'UTC-12:00 (Baker Island, Howland Island)' },
    { value: -11, label: 'UTC-11:00 (American Samoa, Niue, Midway Island)' },
    { value: -10, label: 'UTC-10:00 (Hawaii, Tahiti, Cook Islands, Honolulu)' },
    { value: -9.5, label: 'UTC-09:30 (Marquesas Islands)' },
    { value: -9, label: 'UTC-09:00 (Alaska, Gambier Islands, Anchorage)' },
    { value: -8, label: 'UTC-08:00 (Pacific Time - Los Angeles, Vancouver, Seattle)' },
    
    // UTC-7 to UTC-3 (Americas)
    { value: -7, label: 'UTC-07:00 (Mountain Time - Denver, Phoenix, Calgary)' },
    { value: -6, label: 'UTC-06:00 (Central Time - Chicago, Mexico City, Winnipeg)' },
    { value: -5, label: 'UTC-05:00 (Eastern Time - New York, Toronto, Miami)' },
    { value: -4.5, label: 'UTC-04:30 (Venezuela - Caracas)' },
    { value: -4, label: 'UTC-04:00 (Atlantic Time - Halifax, Santiago, La Paz)' },
    { value: -3.5, label: 'UTC-03:30 (Newfoundland - St. John\'s)' },
    { value: -3, label: 'UTC-03:00 (Brazil, Argentina - São Paulo, Buenos Aires)' },
    { value: -2, label: 'UTC-02:00 (South Georgia, Fernando de Noronha)' },
    { value: -1, label: 'UTC-01:00 (Azores, Cape Verde - Praia)' },
    
    // UTC+0 to UTC+4 (Europe, Africa, Middle East)
    { value: 0, label: 'UTC+00:00 (London, Lisbon, Accra, Dublin)' },
    { value: 1, label: 'UTC+01:00 (Paris, Berlin, Rome, Lagos, Madrid)' },
    { value: 2, label: 'UTC+02:00 (Cairo, Johannesburg, Athens, Helsinki, Kiev)' },
    { value: 3, label: 'UTC+03:00 (Moscow, Istanbul, Nairobi, Riyadh, Baghdad)' },
    { value: 3.5, label: 'UTC+03:30 (Tehran, Iran)' },
    { value: 4, label: 'UTC+04:00 (Dubai, Baku, Tbilisi, Yerevan)' },
    { value: 4.5, label: 'UTC+04:30 (Kabul, Afghanistan)' },
    
    // UTC+5 to UTC+8 (Asia)
    { value: 5, label: 'UTC+05:00 (Mumbai, Delhi, Tashkent, Karachi)' },
    { value: 5.5, label: 'UTC+05:30 (India - New Delhi, Kolkata, Chennai)' },
    { value: 5.75, label: 'UTC+05:45 (Nepal - Kathmandu)' },
    { value: 6, label: 'UTC+06:00 (Dhaka, Almaty, Astana, Omsk)' },
    { value: 6.5, label: 'UTC+06:30 (Myanmar - Yangon, Cocos Islands)' },
    { value: 7, label: 'UTC+07:00 (Bangkok, Jakarta, Ho Chi Minh City, Novosibirsk)' },
    { value: 8, label: 'UTC+08:00 (Beijing, Singapore, Manila, Perth, Hong Kong)' },
    { value: 8.75, label: 'UTC+08:45 (Western Australia - Eucla)' },
    
    // UTC+9 to UTC+12 (East Asia, Oceania)
    { value: 9, label: 'UTC+09:00 (Tokyo, Seoul, Pyongyang, Osaka)' },
    { value: 9.5, label: 'UTC+09:30 (Adelaide, Darwin, Australia)' },
    { value: 10, label: 'UTC+10:00 (Sydney, Melbourne, Brisbane, Vladivostok)' },
    { value: 10.5, label: 'UTC+10:30 (Lord Howe Island, Australia)' },
    { value: 11, label: 'UTC+11:00 (Solomon Islands, New Caledonia, Magadan)' },
    { value: 11.5, label: 'UTC+11:30 (Norfolk Island, Australia)' },
    { value: 12, label: 'UTC+12:00 (Auckland, Fiji, Kamchatka, Wellington)' },
    { value: 12.75, label: 'UTC+12:45 (Chatham Islands, New Zealand)' },
    { value: 13, label: 'UTC+13:00 (Samoa, Tonga, Phoenix Islands)' },
    { value: 14, label: 'UTC+14:00 (Line Islands, Kiribati)' }
  ];
};

// Additional timezone utilities
export const getTimezoneByOffset = (offset: number): { value: number; label: string } | undefined => {
  return getTimezoneOptions().find(option => option.value === offset);
};

export const getTimezoneByCity = (city: string): { value: number; label: string } | undefined => {
  const cityLower = city.toLowerCase();
  return getTimezoneOptions().find(option => 
    option.label.toLowerCase().includes(cityLower)
  );
};

export const formatTimezoneOffset = (offset: number): string => {
  const sign = offset >= 0 ? '+' : '';
  const hours = Math.floor(Math.abs(offset));
  const minutes = Math.abs(offset) % 1;
  const minutesStr = minutes > 0 ? `:${Math.floor(minutes * 60).toString().padStart(2, '0')}` : '';
  return `UTC${sign}${hours}${minutesStr}`;
};
