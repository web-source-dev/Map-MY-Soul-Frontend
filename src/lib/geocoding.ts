import { BirthPlace } from './astrology';
import { findCityByName } from './cities-unified';

// OpenStreetMap Nominatim API for geocoding
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';

// Geocoding service using OpenStreetMap Nominatim API
export const geocodeCity = async (cityName: string): Promise<BirthPlace | null> => {
  try {
    console.log('Geocoding request for:', cityName);
    
    // First, check if we have this city in our database
    const knownCity = findCityByName(cityName);
    if (knownCity && knownCity.latitude && knownCity.longitude) {
      console.log('Using cached coordinates for:', cityName);
      return {
        latitude: knownCity.latitude,
        longitude: knownCity.longitude,
        altitude: 0
      };
    }
    
    // If not in database or no coordinates, use OpenStreetMap API
    console.log('Using OpenStreetMap Nominatim API for:', cityName);
    
    // Parse city and country from the input
    const parts = cityName.split(',').map(part => part.trim());
    const cityPart = parts[0];
    const countryPart = parts.length > 1 ? parts[parts.length - 1] : '';
    
    // Build the API URL
    const params = new URLSearchParams({
      city: cityPart,
      format: 'json',
      limit: '1'
    });
    
    if (countryPart) {
      params.append('country', countryPart);
    }
    
    const response = await fetch(`${NOMINATIM_BASE_URL}?${params.toString()}`, {
      headers: {
        'User-Agent': 'MapMySoul/1.0 (https://mapmysoul.com)'
      }
    });
    
    if (!response.ok) {
      console.warn('OpenStreetMap API unavailable, returning null');
      return null;
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = data[0];
      console.log('OpenStreetMap geocoding result:', result);
      
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        altitude: 0
      };
    }
    
    console.warn('No results found from OpenStreetMap API');
    return null;
    
  } catch (error) {
    console.warn('Geocoding failed:', error);
    return null;
  }
};

export const getCoordinatesForCity = async (cityName: string): Promise<BirthPlace | null> => {
  // Use only OpenStreetMap Nominatim API
  return await geocodeCity(cityName);
};

// Helper function to check if we have coordinates
export const hasCoordinates = (birthPlace: string | BirthPlace): birthPlace is BirthPlace => {
  return typeof birthPlace === 'object' && 
         typeof birthPlace.latitude === 'number' && 
         typeof birthPlace.longitude === 'number';
};
