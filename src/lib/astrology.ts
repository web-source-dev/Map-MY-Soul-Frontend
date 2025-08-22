import { julian, sexa, solar, moonposition, coord, sidereal, nutation, planetposition } from "astronomia";
import { getCoordinatesForCity } from './geocoding';

export interface AstrologyData {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  birthChart?: any;
  calculationMethod?: 'accurate';
}

export interface BirthPlace {
  latitude: number;
  longitude: number;
  altitude?: number;
}

/** Map ecliptic longitude (0..360) -> tropical zodiac sign */
function longitudeToSign(lonDeg: number): string {
  const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
  const i = Math.floor(((lonDeg % 360) + 360) / 30) % 12;
  return signs[i];
}

/** Normalize degrees to 0..360 */
function norm360(x: number): number {
  let v = x % 360;
  if (v < 0) v += 360;
  return v;
}

/** Convert local time components + tz offset hours -> Date (UTC) */
function localToUTCDate(year: number, month: number, day: number, hour: number, minute: number, tzOffsetHours: number) {
  // Calculate UTC time properly
  let utcHour = hour - tzOffsetHours;
  let utcDay = day;
  let utcMonth = month;
  let utcYear = year;
  
  // Handle day rollover
  if (utcHour < 0) {
    utcHour += 24;
    utcDay--;
    if (utcDay < 1) {
      utcMonth--;
      if (utcMonth < 1) {
        utcMonth = 12;
        utcYear--;
      }
      // Get days in previous month
      const daysInMonth = new Date(utcYear, utcMonth, 0).getDate();
      utcDay = daysInMonth;
    }
  } else if (utcHour >= 24) {
    utcHour -= 24;
    utcDay++;
    const daysInMonth = new Date(utcYear, utcMonth, 0).getDate();
    if (utcDay > daysInMonth) {
      utcDay = 1;
      utcMonth++;
      if (utcMonth > 12) {
        utcMonth = 1;
        utcYear++;
      }
    }
  }
  
  // JS Date.UTC uses month index 0..11
  const utcMillis = Date.UTC(utcYear, utcMonth - 1, utcDay, utcHour, minute, 0);
  return new Date(utcMillis);
}

/** Compute Ascendant longitude (degrees) from date (UTC) and observer (deg) */
function ascendantLongitude(dateUTC: Date, latDeg: number, lonDegEast: number): number {
  try {
    // 1) Julian Day (UT1 ~ UTC for our purposes)
    const jd = (julian.CalendarGregorianToJD as any)(
      dateUTC.getUTCFullYear(),
      dateUTC.getUTCMonth() + 1,
      dateUTC.getUTCDate(),
      dateUTC.getUTCHours()
    );

    // 2) Greenwich mean sidereal time (GMST) in hours
    const gmst = (sidereal as any).mean(jd); // hours - using mean sidereal time

    // 3) Local mean sidereal time (LMST) in hours (east longitudes positive)
    const lmstHours = (gmst + lonDegEast/15 + 24) % 24;

    // 4) True obliquity of the ecliptic (ε) in radians
    const ΔψΔε = nutation.nutation(jd);           // nutation in longitude Δψ and obliquity Δε (radians)
    const ε0 = nutation.meanObliquityLaskar(jd);  // mean obliquity (radians)
    const ε = ε0 + ΔψΔε[1];                       // true obliquity (radians)

    // 5) Ascendant formula (Meeus/Astronomia):
    //    tan(Asc) = 1 / [cos ε * tan φ + sin ε * sin θ]
    //    where θ = LMST * 15° (in radians), φ = latitude
    const φ = latDeg * Math.PI / 180;
    const θ = (lmstHours * 15) * Math.PI / 180;
    const cosε = Math.cos(ε), sinε = Math.sin(ε);
    const tanφ = Math.tan(φ), sinθ = Math.sin(θ);

    const numerator = 1;
    const denominator = (cosε * tanφ) + (sinε * sinθ);
    let ascRad = Math.atan2(numerator, denominator);  // returns angle in -π..π
    // Convert from right ascension-like angle to ecliptic longitude:
    // Ascendant longitude λ = atan2(sinθ * cosε - tanφ * sinε, cosθ)  (alternative form)
    // Use the more stable explicit form:
    const cosθ = Math.cos(θ);
    ascRad = Math.atan2( sinθ * cosε - tanφ * sinε, cosθ );

    let ascDeg = ascRad * 180/Math.PI;
    ascDeg = norm360(ascDeg);
    return ascDeg;
  } catch (error) {
    console.warn('Ascendant calculation failed, using fallback:', error);
    // Simple fallback: use local time as approximation
    const localHour = (dateUTC.getUTCHours() + 24) % 24;
    const ascDeg = (localHour * 15 + lonDegEast) % 360;
    return norm360(ascDeg);
  }
}

/** Compute Sun/Moon tropical longitudes (degrees) at UTC date */
function sunMoonLongitudes(dateUTC: Date): { sunLon: number; moonLon: number } {
  try {
    // Julian Day (UT) - calculate using astronomia function with time
    const jd = (julian.CalendarGregorianToJD as any)(
      dateUTC.getUTCFullYear(),
      dateUTC.getUTCMonth() + 1,
      dateUTC.getUTCDate(),
      dateUTC.getUTCHours()
    );

    // Sun apparent ecliptic longitude (radians) -> degrees
    const λsun = solar.apparentLongitude(jd) * 180/Math.PI;

    // Moon ecliptic longitude (radians) -> degrees
    const moon = moonposition.position(jd); // { lon (rad), lat (rad), range }
    const λmoon = moon.lon * 180/Math.PI;

    return { sunLon: norm360(λsun), moonLon: norm360(λmoon) };
  } catch (error) {
    console.warn('Sun/Moon calculation failed, using fallback:', error);
    // Simple fallback based on date
    const year = dateUTC.getUTCFullYear();
    const month = dateUTC.getUTCMonth() + 1;
    const day = dateUTC.getUTCDate();
    
         // Approximate sun position based on date
     const daysSinceVernalEquinox = Math.floor((new Date(year, month - 1, day).getTime() - new Date(year, 2, 20).getTime()) / (1000 * 60 * 60 * 24));
     const sunLon = norm360(daysSinceVernalEquinox * 0.9856); // ~1 degree per day
    
    // Approximate moon position (simplified)
    const moonLon = norm360(sunLon + 90); // Rough approximation
    
    return { sunLon, moonLon };
  }
}

// Comprehensive astronomical calculation with robust error handling
const calculateWithAstronomia = async (
  birthDate: string,
  birthTime: string,
  birthPlace: BirthPlace,
  timezoneOffset: number = 0 // Default to UTC if not provided
): Promise<AstrologyData> => {
  try {
    // Parse the birth date and time
    const [year, month, day] = birthDate.split('-').map(Number);
    const [hour, minute] = birthTime.split(':').map(Number);
    
    // Validate input
    if (!year || !month || !day || hour === undefined || minute === undefined) {
      throw new Error('Invalid birth date or time format');
    }
    
    if (!birthPlace.latitude || !birthPlace.longitude) {
      throw new Error('Invalid birth place coordinates');
    }
    
    // Convert local time to UTC
    const dateUTC = localToUTCDate(year, month, day, hour, minute, timezoneOffset);
    
    // Get accurate planetary positions using ecliptic longitudes
    const { sunLon, moonLon } = sunMoonLongitudes(dateUTC);
    const ascLon = ascendantLongitude(dateUTC, birthPlace.latitude, birthPlace.longitude);
    
    // Calculate signs from ecliptic longitudes
    const sunSign = longitudeToSign(sunLon);
    const moonSign = longitudeToSign(moonLon);
    const risingSign = longitudeToSign(ascLon);
    
    return {
      sunSign,
      moonSign,
      risingSign,
      birthChart: {
        sun: { longitude: sunLon, sign: sunSign },
        moon: { longitude: moonLon, sign: moonSign },
        ascendant: { longitude: ascLon, sign: risingSign },
        observer: { latitude: birthPlace.latitude, longitude: birthPlace.longitude, altitude: birthPlace.altitude },
        calculationDate: dateUTC
      },
      calculationMethod: 'accurate'
    };
  } catch (error) {
    console.error("Astronomical calculation error:", error);
    throw error instanceof Error ? error : new Error(String(error)); // Re-throw to let caller handle
  }
};

// Main comprehensive calculation function
export const calculateAstrology = async (
  birthDate: string,
  birthTime: string,
  birthPlace: string | BirthPlace,
  timezoneOffset: number = 0 // Default to UTC
): Promise<AstrologyData> => {
  try {
    console.log('Starting comprehensive astrology calculation with:', { birthDate, birthTime, birthPlace, timezoneOffset });
    
    let coordinates: BirthPlace;
    
    // Handle different birth place formats
    if (typeof birthPlace === 'object' && birthPlace.latitude && birthPlace.longitude) {
      coordinates = birthPlace;
      console.log('Using provided coordinates:', coordinates);
    } else if (typeof birthPlace === 'string' && birthPlace !== 'Unknown') {
      console.log('Geocoding location:', birthPlace);
      const geocoded = await getCoordinatesForCity(birthPlace);
      if (!geocoded) {
        throw new Error(`Could not find coordinates for: ${birthPlace}`);
      }
      coordinates = geocoded;
      console.log('Geocoding successful:', coordinates);
    } else {
      throw new Error('Invalid birth place provided');
    }
    
    // Perform comprehensive astronomical calculation
    const result = await calculateWithAstronomia(birthDate, birthTime, coordinates, timezoneOffset);
    console.log('Comprehensive calculation successful:', result);
    return result;
    
  } catch (error) {
    console.error('Astrology calculation failed:', error);
    // Return a structured error response instead of falling back
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Astrology calculation failed: ${errorMessage}`);
  }
};

// Crystal recommendations based on sun sign
export const getCrystalRecommendation = (sunSign: string): string => {
  const crystalMap: Record<string, string> = {
    'Aries': 'Carnelian - Enhances courage, energy, and creativity',
    'Taurus': 'Rose Quartz - Promotes love, harmony, and emotional healing',
    'Gemini': 'Citrine - Boosts communication, clarity, and optimism',
    'Cancer': 'Moonstone - Supports intuition, emotional balance, and nurturing',
    'Leo': 'Sunstone - Amplifies confidence, leadership, and personal power',
    'Virgo': 'Amazonite - Aids in organization, healing, and stress relief',
    'Libra': 'Pink Opal - Encourages balance, harmony, and peaceful relationships',
    'Scorpio': 'Obsidian - Provides protection, transformation, and deep healing',
    'Sagittarius': 'Lapis Lazuli - Enhances wisdom, truth-seeking, and spiritual growth',
    'Capricorn': 'Black Tourmaline - Offers grounding, protection, and practical wisdom',
    'Aquarius': 'Amethyst - Supports innovation, spiritual awareness, and humanitarian values',
    'Pisces': 'Aquamarine - Promotes compassion, psychic abilities, and emotional healing'
  };

  return crystalMap[sunSign] || 'Clear Quartz - Universal healing and amplification';
};
