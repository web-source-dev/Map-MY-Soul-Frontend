export interface City {
  name: string;
  country: string;
  timezoneOffset: number;
  population?: number;
  // Optional coordinates - will be fetched from geocoding API when needed
  latitude?: number;
  longitude?: number;
  timezone?: string; // IANA timezone identifier
}

export const popularCities: City[] = [
  // Major US Cities
  { name: "New York", country: "USA", timezoneOffset: -5, population: 8336817, timezone: "America/New_York" },
  { name: "Los Angeles", country: "USA", timezoneOffset: -8, population: 3979576, timezone: "America/Los_Angeles" },
  { name: "Chicago", country: "USA", timezoneOffset: -6, population: 2693976, timezone: "America/Chicago" },
  { name: "Houston", country: "USA", timezoneOffset: -6, population: 2320268, timezone: "America/Chicago" },
  { name: "Phoenix", country: "USA", timezoneOffset: -7, population: 1680992, timezone: "America/Phoenix" },
  { name: "Philadelphia", country: "USA", timezoneOffset: -5, population: 1603797, timezone: "America/New_York" },
  { name: "San Antonio", country: "USA", timezoneOffset: -6, population: 1547253, timezone: "America/Chicago" },
  { name: "San Diego", country: "USA", timezoneOffset: -8, population: 1423851, timezone: "America/Los_Angeles" },
  { name: "Dallas", country: "USA", timezoneOffset: -6, population: 1343573, timezone: "America/Chicago" },
  { name: "San Jose", country: "USA", timezoneOffset: -8, population: 1030119, timezone: "America/Los_Angeles" },

  // Major European Cities
  { name: "London", country: "UK", timezoneOffset: 0, population: 8982000, timezone: "Europe/London" },
  { name: "Paris", country: "France", timezoneOffset: 1, population: 2161000, timezone: "Europe/Paris" },
  { name: "Berlin", country: "Germany", timezoneOffset: 1, population: 3669491, timezone: "Europe/Berlin" },
  { name: "Madrid", country: "Spain", timezoneOffset: 1, population: 3223000, timezone: "Europe/Madrid" },
  { name: "Rome", country: "Italy", timezoneOffset: 1, population: 2873000, timezone: "Europe/Rome" },
  { name: "Amsterdam", country: "Netherlands", timezoneOffset: 1, population: 821752, timezone: "Europe/Amsterdam" },
  { name: "Barcelona", country: "Spain", timezoneOffset: 1, population: 1620000, timezone: "Europe/Madrid" },
  { name: "Vienna", country: "Austria", timezoneOffset: 1, population: 1897000, timezone: "Europe/Vienna" },
  { name: "Prague", country: "Czech Republic", timezoneOffset: 1, population: 1309000, timezone: "Europe/Prague" },
  { name: "Stockholm", country: "Sweden", timezoneOffset: 1, population: 975551, timezone: "Europe/Stockholm" },

  // Major Asian Cities
  { name: "Tokyo", country: "Japan", timezoneOffset: 9, population: 13929286, timezone: "Asia/Tokyo" },
  { name: "Delhi", country: "India", timezoneOffset: 5.5, population: 30290936, timezone: "Asia/Kolkata" },
  { name: "Shanghai", country: "China", timezoneOffset: 8, population: 24870895, timezone: "Asia/Shanghai" },
  { name: "Mumbai", country: "India", timezoneOffset: 5.5, population: 20411274, timezone: "Asia/Kolkata" },
  { name: "Beijing", country: "China", timezoneOffset: 8, population: 21540000, timezone: "Asia/Shanghai" },
  { name: "Dhaka", country: "Bangladesh", timezoneOffset: 6, population: 20283552, timezone: "Asia/Dhaka" },
  { name: "Osaka", country: "Japan", timezoneOffset: 9, population: 1916534, timezone: "Asia/Tokyo" },
  { name: "Karachi", country: "Pakistan", timezoneOffset: 5, population: 14910352, timezone: "Asia/Karachi" },
  { name: "Bangkok", country: "Thailand", timezoneOffset: 7, population: 8280925, timezone: "Asia/Bangkok" },
  { name: "Istanbul", country: "Turkey", timezoneOffset: 3, population: 15190336, timezone: "Europe/Istanbul" },

  // Major Cities in Other Regions
  { name: "Sydney", country: "Australia", timezoneOffset: 10, population: 5312163, timezone: "Australia/Sydney" },
  { name: "Melbourne", country: "Australia", timezoneOffset: 10, population: 5078193, timezone: "Australia/Melbourne" },
  { name: "Toronto", country: "Canada", timezoneOffset: -5, population: 2930000, timezone: "America/Toronto" },
  { name: "Vancouver", country: "Canada", timezoneOffset: -8, population: 675218, timezone: "America/Vancouver" },
  { name: "Montreal", country: "Canada", timezoneOffset: -5, population: 1780000, timezone: "America/Toronto" },
  { name: "Mexico City", country: "Mexico", timezoneOffset: -6, population: 9209944, timezone: "America/Mexico_City" },
  { name: "São Paulo", country: "Brazil", timezoneOffset: -3, population: 12325232, timezone: "America/Sao_Paulo" },
  { name: "Buenos Aires", country: "Argentina", timezoneOffset: -3, population: 3075646, timezone: "America/Argentina/Buenos_Aires" },
  { name: "Lima", country: "Peru", timezoneOffset: -5, population: 9562280, timezone: "America/Lima" },
  { name: "Bogotá", country: "Colombia", timezoneOffset: -5, population: 7181468, timezone: "America/Bogota" },

  // African Cities
  { name: "Cairo", country: "Egypt", timezoneOffset: 2, population: 10230350, timezone: "Africa/Cairo" },
  { name: "Lagos", country: "Nigeria", timezoneOffset: 1, population: 14862000, timezone: "Africa/Lagos" },
  { name: "Kinshasa", country: "DR Congo", timezoneOffset: 1, population: 17071000, timezone: "Africa/Kinshasa" },
  { name: "Johannesburg", country: "South Africa", timezoneOffset: 2, population: 5650000, timezone: "Africa/Johannesburg" },
  { name: "Nairobi", country: "Kenya", timezoneOffset: 3, population: 4397073, timezone: "Africa/Nairobi" },
  { name: "Casablanca", country: "Morocco", timezoneOffset: 0, population: 3356000, timezone: "Africa/Casablanca" },
  { name: "Addis Ababa", country: "Ethiopia", timezoneOffset: 3, population: 3352000, timezone: "Africa/Addis_Ababa" },
  { name: "Dar es Salaam", country: "Tanzania", timezoneOffset: 3, population: 4364541, timezone: "Africa/Dar_es_Salaam" },
  { name: "Algiers", country: "Algeria", timezoneOffset: 1, population: 3415811, timezone: "Africa/Algiers" },
  { name: "Khartoum", country: "Sudan", timezoneOffset: 2, population: 5274321, timezone: "Africa/Khartoum" },

  // Middle Eastern Cities
  { name: "Dubai", country: "UAE", timezoneOffset: 4, population: 3331420, timezone: "Asia/Dubai" },
  { name: "Riyadh", country: "Saudi Arabia", timezoneOffset: 3, population: 7676654, timezone: "Asia/Riyadh" },
  { name: "Tehran", country: "Iran", timezoneOffset: 3.5, population: 9013543, timezone: "Asia/Tehran" },
  { name: "Baghdad", country: "Iraq", timezoneOffset: 3, population: 7511945, timezone: "Asia/Baghdad" },
  { name: "Kuwait City", country: "Kuwait", timezoneOffset: 3, population: 2989000, timezone: "Asia/Kuwait" },
  { name: "Doha", country: "Qatar", timezoneOffset: 3, population: 2382000, timezone: "Asia/Qatar" },
  { name: "Amman", country: "Jordan", timezoneOffset: 2, population: 4061150, timezone: "Asia/Amman" },
  { name: "Beirut", country: "Lebanon", timezoneOffset: 2, population: 2200000, timezone: "Asia/Beirut" },
  { name: "Tel Aviv", country: "Israel", timezoneOffset: 2, population: 451523, timezone: "Asia/Jerusalem" },
  { name: "Muscat", country: "Oman", timezoneOffset: 4, population: 1720000, timezone: "Asia/Muscat" },

  // South Asian Cities
  { name: "Kolkata", country: "India", timezoneOffset: 5.5, population: 14850000, timezone: "Asia/Kolkata" },
  { name: "Chennai", country: "India", timezoneOffset: 5.5, population: 7088000, timezone: "Asia/Kolkata" },
  { name: "Bangalore", country: "India", timezoneOffset: 5.5, population: 8443675, timezone: "Asia/Kolkata" },
  { name: "Hyderabad", country: "India", timezoneOffset: 5.5, population: 6993262, timezone: "Asia/Kolkata" },
  { name: "Ahmedabad", country: "India", timezoneOffset: 5.5, population: 5570585, timezone: "Asia/Kolkata" },
  { name: "Pune", country: "India", timezoneOffset: 5.5, population: 3115431, timezone: "Asia/Kolkata" },
  { name: "Surat", country: "India", timezoneOffset: 5.5, population: 4467797, timezone: "Asia/Kolkata" },
  { name: "Jaipur", country: "India", timezoneOffset: 5.5, population: 3073350, timezone: "Asia/Kolkata" },
  { name: "Lucknow", country: "India", timezoneOffset: 5.5, population: 2817105, timezone: "Asia/Kolkata" },
  { name: "Kanpur", country: "India", timezoneOffset: 5.5, population: 2767031, timezone: "Asia/Kolkata" },

  // Southeast Asian Cities
  { name: "Jakarta", country: "Indonesia", timezoneOffset: 7, population: 10562088, timezone: "Asia/Jakarta" },
  { name: "Manila", country: "Philippines", timezoneOffset: 8, population: 1780148, timezone: "Asia/Manila" },
  { name: "Ho Chi Minh City", country: "Vietnam", timezoneOffset: 7, population: 8993082, timezone: "Asia/Ho_Chi_Minh" },
  { name: "Hanoi", country: "Vietnam", timezoneOffset: 7, population: 8053663, timezone: "Asia/Ho_Chi_Minh" },
  { name: "Kuala Lumpur", country: "Malaysia", timezoneOffset: 8, population: 1790000, timezone: "Asia/Kuala_Lumpur" },
  { name: "Singapore", country: "Singapore", timezoneOffset: 8, population: 5685807, timezone: "Asia/Singapore" },
  { name: "Yangon", country: "Myanmar", timezoneOffset: 6.5, population: 5214000, timezone: "Asia/Yangon" },
  { name: "Phnom Penh", country: "Cambodia", timezoneOffset: 7, population: 2129371, timezone: "Asia/Phnom_Penh" },
  { name: "Vientiane", country: "Laos", timezoneOffset: 7, population: 820940, timezone: "Asia/Vientiane" },
  { name: "Bandar Seri Begawan", country: "Brunei", timezoneOffset: 8, population: 100700, timezone: "Asia/Brunei" },

  // East Asian Cities
  { name: "Seoul", country: "South Korea", timezoneOffset: 9, population: 9733509, timezone: "Asia/Seoul" },
  { name: "Busan", country: "South Korea", timezoneOffset: 9, population: 3393191, timezone: "Asia/Seoul" },
  { name: "Incheon", country: "South Korea", timezoneOffset: 9, population: 2947217, timezone: "Asia/Seoul" },
  { name: "Daegu", country: "South Korea", timezoneOffset: 9, population: 2466052, timezone: "Asia/Seoul" },
  { name: "Daejeon", country: "South Korea", timezoneOffset: 9, population: 1538394, timezone: "Asia/Seoul" },
  { name: "Gwangju", country: "South Korea", timezoneOffset: 9, population: 1502881, timezone: "Asia/Seoul" },
  { name: "Suwon", country: "South Korea", timezoneOffset: 9, population: 1234300, timezone: "Asia/Seoul" },
  { name: "Ulsan", country: "South Korea", timezoneOffset: 9, population: 1166033, timezone: "Asia/Seoul" },
  { name: "Changwon", country: "South Korea", timezoneOffset: 9, population: 1053551, timezone: "Asia/Seoul" },
  { name: "Seongnam", country: "South Korea", timezoneOffset: 9, population: 948757, timezone: "Asia/Seoul" },

  // Oceania Cities
  { name: "Brisbane", country: "Australia", timezoneOffset: 10, population: 2487096, timezone: "Australia/Brisbane" },
  { name: "Perth", country: "Australia", timezoneOffset: 8, population: 2146107, timezone: "Australia/Perth" },
  { name: "Adelaide", country: "Australia", timezoneOffset: 9.5, population: 1358820, timezone: "Australia/Adelaide" },
  { name: "Gold Coast", country: "Australia", timezoneOffset: 10, population: 646983, timezone: "Australia/Brisbane" },
  { name: "Newcastle", country: "Australia", timezoneOffset: 10, population: 322278, timezone: "Australia/Sydney" },
  { name: "Canberra", country: "Australia", timezoneOffset: 10, population: 431380, timezone: "Australia/Sydney" },
  { name: "Auckland", country: "New Zealand", timezoneOffset: 12, population: 1652000, timezone: "Pacific/Auckland" },
  { name: "Wellington", country: "New Zealand", timezoneOffset: 12, population: 212700, timezone: "Pacific/Auckland" },
  { name: "Christchurch", country: "New Zealand", timezoneOffset: 12, population: 383200, timezone: "Pacific/Auckland" },
  { name: "Hamilton", country: "New Zealand", timezoneOffset: 12, population: 176500, timezone: "Pacific/Auckland" },

  // Additional Major Cities
  { name: "Moscow", country: "Russia", timezoneOffset: 3, population: 12506468, timezone: "Europe/Moscow" },
  { name: "Saint Petersburg", country: "Russia", timezoneOffset: 3, population: 5376672, timezone: "Europe/Moscow" },
  { name: "Novosibirsk", country: "Russia", timezoneOffset: 7, population: 1625631, timezone: "Asia/Novosibirsk" },
  { name: "Yekaterinburg", country: "Russia", timezoneOffset: 5, population: 1493749, timezone: "Asia/Yekaterinburg" },
  { name: "Kazan", country: "Russia", timezoneOffset: 3, population: 1251961, timezone: "Europe/Moscow" },
  { name: "Nizhny Novgorod", country: "Russia", timezoneOffset: 3, population: 1259013, timezone: "Europe/Moscow" },
  { name: "Chelyabinsk", country: "Russia", timezoneOffset: 5, population: 1202371, timezone: "Asia/Yekaterinburg" },
  { name: "Samara", country: "Russia", timezoneOffset: 4, population: 1173299, timezone: "Europe/Samara" },
  { name: "Omsk", country: "Russia", timezoneOffset: 6, population: 1172076, timezone: "Asia/Omsk" },
  { name: "Rostov-on-Don", country: "Russia", timezoneOffset: 3, population: 1137704, timezone: "Europe/Moscow" }
];

// Search cities for autocomplete
export const searchCities = (query: string): City[] => {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  
  return popularCities
    .filter(city => 
      city.name.toLowerCase().includes(lowerQuery) ||
      city.country.toLowerCase().includes(lowerQuery) ||
      `${city.name}, ${city.country}`.toLowerCase().includes(lowerQuery)
    )
    .sort((a, b) => {
      // Prioritize exact matches
      const aExact = a.name.toLowerCase() === lowerQuery || a.country.toLowerCase() === lowerQuery;
      const bExact = b.name.toLowerCase() === lowerQuery || b.country.toLowerCase() === lowerQuery;
      
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Then sort by population (larger cities first)
      return (b.population || 0) - (a.population || 0);
    })
    .slice(0, 10); // Limit to 10 suggestions
};

// Find a specific city by name
export const findCityByName = (cityName: string): City | undefined => {
  const normalizedName = cityName.toLowerCase().trim();
  
  // First try exact match
  let city = popularCities.find(city =>
    city.name.toLowerCase() === normalizedName ||
    `${city.name}, ${city.country}`.toLowerCase() === normalizedName
  );
  
  if (city) return city;
  
  // Try partial matches
  city = popularCities.find(city =>
    city.name.toLowerCase().includes(normalizedName) ||
    normalizedName.includes(city.name.toLowerCase()) ||
    city.country.toLowerCase().includes(normalizedName) ||
    normalizedName.includes(city.country.toLowerCase())
  );
  
  if (city) return city;
  
  // Try matching just the city name part (before comma)
  const cityNameOnly = normalizedName.split(',')[0].trim();
  city = popularCities.find(city =>
    city.name.toLowerCase() === cityNameOnly ||
    city.name.toLowerCase().includes(cityNameOnly) ||
    cityNameOnly.includes(city.name.toLowerCase())
  );
  
  return city;
};

// Get timezone offset for a city
export const getTimezoneOffset = (cityName: string): number => {
  const city = findCityByName(cityName);
  return city?.timezoneOffset || 0;
};

// Get IANA timezone for a city
export const getTimezone = (cityName: string): string | undefined => {
  const city = findCityByName(cityName);
  return city?.timezone;
};
