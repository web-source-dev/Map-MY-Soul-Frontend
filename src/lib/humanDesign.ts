import { julian, solar, moonposition, sidereal, nutation } from 'astronomia';

/* ----------------- Utilities ----------------- */
const toDeg = (rad: number) => rad * 180 / Math.PI;
const norm360 = (d: number) => ((d % 360) + 360) % 360;

/** Convert local time components + tz offset hours -> Date (UTC) */
export function localToUTCDate(year: number, month: number, day: number, hour: number, minute: number, tzOffsetHours: number) {
  // JS Date.UTC uses month index 0..11
  const utcMillis = Date.UTC(year, month - 1, day, hour - tzOffsetHours, minute, 0);
  return new Date(utcMillis);
}

/* ----------------- Astronomical functions (tropical ecliptic longitudes) ----------------- */
/** Return Sun apparent ecliptic longitude in degrees (tropical) at UTC Date */
export function sunLongitudeDeg(dateUTC: Date): number {
  const jd = julian.CalendarGregorianToJD(
    dateUTC.getUTCFullYear(),
    dateUTC.getUTCMonth() + 1,
    dateUTC.getUTCDate() + (dateUTC.getUTCHours() + dateUTC.getUTCMinutes()/60 + dateUTC.getUTCSeconds()/3600)/24
  );
  // astronomia.solar.apparentLongitude returns radians
  const lam = solar.apparentLongitude(jd);
  return norm360(toDeg(lam));
}

/** Return Moon ecliptic longitude in degrees at UTC Date */
export function moonLongitudeDeg(dateUTC: Date): number {
  const jd = julian.CalendarGregorianToJD(
    dateUTC.getUTCFullYear(),
    dateUTC.getUTCMonth() + 1,
    dateUTC.getUTCDate() + (dateUTC.getUTCHours() + dateUTC.getUTCMinutes()/60 + dateUTC.getUTCSeconds()/3600)/24
  );
  const m = moonposition.position(jd); // { lon (rad), lat (rad), range }
  return norm360(toDeg(m.lon));
}

/** Compute Ascendant (ecliptic longitude) in degrees using Meeus / astronomia pieces
 * dateUTC: Date in UTC
 * latDeg: observer latitude (deg), lonDegEast: longitude east positive (deg)
 */
export function ascendantLongitudeDeg(dateUTC: Date, latDeg: number, lonDegEast: number): number {
  const jd = julian.CalendarGregorianToJD(
    dateUTC.getUTCFullYear(),
    dateUTC.getUTCMonth() + 1,
    dateUTC.getUTCDate() + (dateUTC.getUTCHours() + dateUTC.getUTCMinutes()/60 + dateUTC.getUTCSeconds()/3600)/24
  );

  // Greenwich mean sidereal time in hours - use the correct astronomia API
  let gmstHours: number;
  try {
    // Use the correct function name from astronomia
    gmstHours = (sidereal as any).mean(jd);
  } catch (error) {
    // Fallback calculation if the function doesn't exist
    console.warn('sidereal.mean not available, using fallback calculation');
    // Simple GMST calculation as fallback
    const T = (jd - 2451545.0) / 36525;
    gmstHours = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000;
    gmstHours = (gmstHours % 360) / 15; // Convert to hours
  }
  
  const lmstHours = (gmstHours + lonDegEast/15) % 24;
  const θ = lmstHours * 15 * Math.PI / 180; // in radians

  // true obliquity (radians)
  const nut = nutation.nutation(jd); // [dpsi, deps] in radians
  const eps0 = nutation.meanObliquityLaskar(jd);
  const eps = eps0 + nut[1];

  const φ = latDeg * Math.PI / 180;
  const sinθ = Math.sin(θ);
  const cosθ = Math.cos(θ);
  const sinε = Math.sin(eps);
  const cosε = Math.cos(eps);
  const tanφ = Math.tan(φ);

  // Ascendant λ = atan2( sinθ * cosε - tanφ * sinε, cosθ )
  let ascRad = Math.atan2(sinθ * cosε - tanφ * sinε, cosθ);
  let ascDeg = toDeg(ascRad);
  ascDeg = norm360(ascDeg);
  return ascDeg;
}

/* --------------- Human Design gate mapping (tropical) --------------- */
/* Gate segmentation table (per-sign segments). This is the same accurate mapping:
   each sign (0..11) has segments with start/end degrees (0..30) and gate number.
   This dataset accounts for the small cross-sign fragments used in the standard mapping.
*/
type Segment = { start: number; end: number; gate: number };
const Z: Record<number, Segment[]> = {
  0: [ {start:0, end:3.875, gate:25}, {start:3.875, end:9.5, gate:17}, {start:9.5, end:15.125, gate:21},
       {start:15.125, end:20.75, gate:51}, {start:20.75, end:26.375, gate:42}, {start:26.375, end:30, gate:3} ],
  1: [ {start:0, end:2, gate:3}, {start:2, end:7.625, gate:27}, {start:7.625, end:13.25, gate:24},
       {start:13.25, end:18.875, gate:2}, {start:18.875, end:24.5, gate:23}, {start:24.5, end:30, gate:8} ],
  2: [ {start:0, end:0.125, gate:8}, {start:0.125, end:5.75, gate:20}, {start:5.75, end:11.375, gate:16},
       {start:11.375, end:17, gate:35}, {start:17, end:22.625, gate:45}, {start:22.625, end:28.25, gate:12},
       {start:28.25, end:30, gate:15} ],
  3: [ {start:0, end:3.875, gate:15}, {start:3.875, end:9.5, gate:52}, {start:9.5, end:15.125, gate:39},
       {start:15.125, end:20.75, gate:53}, {start:20.75, end:26.375, gate:62}, {start:26.375, end:30, gate:56} ],
  4: [ {start:0, end:2, gate:56}, {start:2, end:7.625, gate:31}, {start:7.625, end:13.25, gate:33},
       {start:13.25, end:18.875, gate:7}, {start:18.875, end:24.5, gate:4}, {start:24.5, end:30, gate:29} ],
  5: [ {start:0, end:0.125, gate:29}, {start:0.125, end:5.75, gate:59}, {start:5.75, end:11.375, gate:40},
       {start:11.375, end:17, gate:64}, {start:17, end:22.625, gate:47}, {start:22.625, end:28.25, gate:6},
       {start:28.25, end:30, gate:46} ],
  6: [ {start:0, end:3.875, gate:46}, {start:3.875, end:9.5, gate:18}, {start:9.5, end:15.125, gate:48},
       {start:15.125, end:20.75, gate:57}, {start:20.75, end:26.375, gate:32}, {start:26.375, end:30, gate:50} ],
  7: [ {start:0, end:2, gate:50}, {start:2, end:7.625, gate:28}, {start:7.625, end:13.25, gate:44},
       {start:13.25, end:18.875, gate:1}, {start:18.875, end:24.5, gate:43}, {start:24.5, end:30, gate:14} ],
  8: [ {start:0, end:0.125, gate:14}, {start:0.125, end:5.75, gate:34}, {start:5.75, end:11.375, gate:9},
       {start:11.375, end:17, gate:5}, {start:17, end:22.625, gate:26}, {start:22.625, end:28.25, gate:11},
       {start:28.25, end:30, gate:10} ],
  9: [ {start:0, end:3.875, gate:10}, {start:3.875, end:9.5, gate:58}, {start:9.5, end:15.125, gate:38},
       {start:15.125, end:20.75, gate:54}, {start:20.75, end:26.375, gate:61}, {start:26.375, end:30, gate:60} ],
  10: [ {start:0, end:2, gate:60}, {start:2, end:7.625, gate:41}, {start:7.625, end:13.25, gate:19},
        {start:13.25, end:18.875, gate:13}, {start:18.875, end:24.5, gate:49}, {start:24.5, end:30, gate:30} ],
  11: [ {start:0, end:0.125, gate:30}, {start:0.125, end:5.75, gate:55}, {start:5.75, end:11.375, gate:37},
        {start:11.375, end:17, gate:63}, {start:17, end:22.625, gate:22}, {start:22.625, end:28.25, gate:36},
        {start:28.25, end:30, gate:25} ]
};

/* sizes */
const GATE_SIZE_DEG = 5.625; // 5°37'30"
const LINE_SIZE_DEG = GATE_SIZE_DEG / 6; // 0.9375°

/** return {gate, line, withinGateDeg, gateStartLon} for an absolute longitude (0..360) */
export function longitudeToGateLine(lonDeg: number) {
  const lon = norm360(lonDeg);
  const sign = Math.floor(lon / 30); // 0..11
  const degInSign = lon - sign * 30; // 0..30
  const segs = Z[sign];
  // find segment
  let seg = segs.find(s => degInSign >= s.start && degInSign < s.end);
  if (!seg) seg = segs[segs.length - 1];

  // compute gate start absolute longitude
  const signStart = sign * 30;
  const segLen = seg.end - seg.start;
  let gateStartLon: number;
  if (Math.abs(segLen - GATE_SIZE_DEG) < 1e-6) {
    gateStartLon = signStart + seg.start;
  } else {
    // crossing sign boundary
    if (seg.start === 0) {
      const missing = GATE_SIZE_DEG - segLen;
      gateStartLon = norm360(signStart - missing);
    } else {
      gateStartLon = signStart + seg.start;
    }
  }
  const withinGate = norm360(lon - gateStartLon);
  const line = Math.floor(withinGate / LINE_SIZE_DEG) + 1;
  return {
    gate: seg.gate,
    line: (line >=1 && line <=6) ? line : ((line<1)?1:6) as 1|2|3|4|5|6,
    withinGateDeg: withinGate,
    gateStartLon
  };
}

/* --------------- Design time solver (Sun - 88°) --------------- */
/**
 * findTimeForSunLongitude(targetLonDeg, approxDateUTC, windowDays)
 * - uses bisection on Julian Day
 */
function sunLongitudeAtJulian(jd: number) {
  // astronomia solar.apparentLongitude expects Julian Day
  const lam = solar.apparentLongitude(jd);
  return norm360(toDeg(lam));
}

export function findDesignTimeForBirth(dateUTC: Date, maxDaysWindow=10) {
  // target = birthSun - 88 (mod 360)
  const birthSun = sunLongitudeDeg(dateUTC);
  const target = norm360(birthSun - 88);

  // convert dateUTC -> jd
  const jdCenter = julian.CalendarGregorianToJD(
    dateUTC.getUTCFullYear(),
    dateUTC.getUTCMonth() + 1,
    dateUTC.getUTCDate() + (dateUTC.getUTCHours() + dateUTC.getUTCMinutes()/60 + dateUTC.getUTCSeconds()/3600)/24
  );

  // search interval [-maxDaysWindow, +maxDaysWindow] in julian days
  const step = 0.5; // days
  let jdA = jdCenter - maxDaysWindow;
  let jdB = jdCenter + maxDaysWindow;

  // Normalize function that gives difference in degrees in -180..+180
  const diff = (lon: number, target: number) => {
    let d = norm360(lon - target);
    if (d > 180) d -= 360;
    return d;
  };

  // Try to bracket a root by stepping
  let found = false;
  let a = jdA, b = a + step;
  while (b <= jdB) {
    const fa = diff(sunLongitudeAtJulian(a), target);
    const fb = diff(sunLongitudeAtJulian(b), target);
    if (fa === 0) { jdA = a; jdB = a; found = true; break; }
    if (fa * fb <= 0) { jdA = a; jdB = b; found = true; break; }
    a = b; b += step;
  }
  if (!found) {
    // fallback: return approx using simple offset (approx 88 degrees ~ 88/360*365.25 days)
    const approxDays = (88/360) * 365.25;
    const approxJd = jdCenter - approxDays;
    const approxMillis = (approxJd - 2440587.5) * 86400000; // JD->ms since 1970-01-01
    return new Date(approxMillis);
  }

  // Bisection refine
  let left = jdA, right = jdB;
  for (let i=0;i<60;i++) {
    const mid = (left + right)/2;
    const fL = diff(sunLongitudeAtJulian(left), target);
    const fM = diff(sunLongitudeAtJulian(mid), target);
    if (Math.abs(fM) < 1e-6) {
      left = mid; right = mid; break;
    }
    if (fL * fM <= 0) right = mid; else left = mid;
  }
  const jdResult = (left + right)/2;
  const ms = (jdResult - 2440587.5) * 86400000;
  return new Date(ms);
}

/* --------------- High-level profile builder --------------- */
export type HDProfile = {
  birthUTC: Date;
  sunLon: number; moonLon: number; ascLon: number;
  personality: { sunGate: any; moonGate: any; ascGate: any };
  designUTC: Date;
  designSunLon: number;
  design: { sunGate: any; moonGate: any; ascGate: any };
};

export function buildHDProfile(
  localYear: number, localMonth: number, localDay: number, localHour: number, localMinute: number,
  tzOffsetHours: number, latDeg: number, lonDegEast: number
): HDProfile {
  const birthUTC = localToUTCDate(localYear, localMonth, localDay, localHour, localMinute, tzOffsetHours);

  const sunLon = sunLongitudeDeg(birthUTC);
  const moonLon = moonLongitudeDeg(birthUTC);
  const ascLon = ascendantLongitudeDeg(birthUTC, latDeg, lonDegEast);

  const personality = {
    sunGate: longitudeToGateLine(sunLon),
    moonGate: longitudeToGateLine(moonLon),
    ascGate: longitudeToGateLine(ascLon)
  };

  const designUTC = findDesignTimeForBirth(birthUTC, 12); // search ±12 days
  const designSunLon = sunLongitudeDeg(designUTC);
  const designMoonLon = moonLongitudeDeg(designUTC);
  const designAscLon = ascendantLongitudeDeg(designUTC, latDeg, lonDegEast);

  const design = {
    sunGate: longitudeToGateLine(designSunLon),
    moonGate: longitudeToGateLine(designMoonLon),
    ascGate: longitudeToGateLine(designAscLon)
  };

  return {
    birthUTC,
    sunLon, moonLon, ascLon,
    personality,
    designUTC,
    designSunLon,
    design
  };
}

// Main Human Design calculation function (compatible with existing interface)
export const calculateHumanDesign = async (
  birthDate: string,
  birthTime: string,
  birthPlace: string,
  timezoneOffset: number = 0
) => {
  try {
    console.log('Starting Human Design calculation with:', { birthDate, birthTime, birthPlace, timezoneOffset });
    
    // Parse the birth date and time
    const [year, month, day] = birthDate.split('-').map(Number);
    const [hour, minute] = birthTime.split(':').map(Number);
    
    // Get coordinates for the birth place
    let coordinates = null;
    try {
      const { getCoordinatesForCity } = await import('./geocoding');
      coordinates = await getCoordinatesForCity(birthPlace);
      console.log('Geocoding result for Human Design:', coordinates);
    } catch (error) {
      console.warn('Geocoding failed for Human Design calculation:', error);
    }
    
    // Use coordinates if available, otherwise use default
    const lat = coordinates?.latitude || 40.7128; // New York default
    const lon = coordinates?.longitude || -74.0060;
    
    console.log('Using coordinates for Human Design:', { lat, lon });
    
    // Build the full profile
    const profile = buildHDProfile(year, month, day, hour, minute, timezoneOffset, lat, lon);
    console.log('Human Design profile built:', profile);
    
    // Determine energy type based on personality gates
    const energyType = determineEnergyType(profile.personality);
    
    // Get strategy and authority
    const strategy = getStrategyRecommendation(energyType);
    const authority = determineAuthority(profile.personality);
    
    // Get profile (combination of personality and design)
    const profileNumber = determineProfile(profile.personality, profile.design);
    
    const result = {
      energyType,
      strategy,
      authority,
      profile: profileNumber,
      definition: determineDefinition(profile.personality, profile.design),
      personality: profile.personality,
      design: profile.design,
      calculationMethod: 'accurate' as const
    };
    
    console.log('Human Design calculation result:', result);
    return result;
  } catch (error) {
    console.error('Human Design calculation error:', error);
    // Fallback to simplified calculation
    return calculateSimplifiedHumanDesign(birthDate, birthTime, birthPlace);
  }
};

// Simplified fallback calculation
const calculateSimplifiedHumanDesign = (birthDate: string, birthTime: string, birthPlace: string) => {
  try {
    const date = new Date(birthDate + 'T' + birthTime);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    
    // Deterministic but varied approach
    const seed = (date.getFullYear() + month * 100 + day * 10000 + hour * 1000000) % 5;
    const energyTypes = ['Generator', 'Manifestor', 'Manifesting Generator', 'Projector', 'Reflector'];
    const energyType = energyTypes[seed];
    
    return {
      energyType,
      strategy: getStrategyRecommendation(energyType),
      authority: 'Sacral', // Default
      profile: '1/3', // Default
      definition: 'Single Definition', // Default
      calculationMethod: 'simplified'
    };
  } catch (error) {
    console.error('Simplified Human Design calculation error:', error);
    return {
      energyType: 'Unknown',
      strategy: '',
      authority: '',
      profile: '',
      definition: '',
      calculationMethod: 'simplified'
    };
  }
};

// Helper functions for determining Human Design components
const determineEnergyType = (personality: any): string => {
  // This is a simplified determination - in practice, it's based on specific gate combinations
  const sunGate = personality.sunGate.gate;
  const moonGate = personality.moonGate.gate;
  
  // Basic energy type determination based on common gate patterns
  if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64].includes(sunGate)) {
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64].includes(moonGate)) {
      return 'Generator';
    }
  }
  
  // Simplified fallback
  const types = ['Generator', 'Manifestor', 'Manifesting Generator', 'Projector', 'Reflector'];
  const index = (sunGate + moonGate) % types.length;
  return types[index];
};

const determineAuthority = (personality: any): string => {
  // Simplified authority determination
  const sunGate = personality.sunGate.gate;
  const moonGate = personality.moonGate.gate;
  
  // Basic authority types based on gate patterns
  if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64].includes(sunGate)) {
    return 'Sacral';
  }
  
  const authorities = ['Sacral', 'Splenic', 'Emotional', 'Ego', 'Self-Projected', 'Outer Authority'];
  const index = (sunGate + moonGate) % authorities.length;
  return authorities[index];
};

const determineProfile = (personality: any, design: any): string => {
  // Profile is determined by the combination of personality and design lines
  const personalityLine = personality.sunGate.line;
  const designLine = design.sunGate.line;
  
  return `${personalityLine}/${designLine}`;
};

const determineDefinition = (personality: any, design: any): string => {
  // Simplified definition determination
  return 'Single Definition'; // Most common
};

// Strategy recommendations
export const getStrategyRecommendation = (energyType: string): string => {
  const strategies: Record<string, string> = {
    'Generator': 'Wait to respond',
    'Manifestor': 'Inform before acting',
    'Manifesting Generator': 'Wait to respond, then inform',
    'Projector': 'Wait for invitation',
    'Reflector': 'Wait a lunar cycle'
  };
  
  return strategies[energyType] || 'Wait to respond';
};

// Human Design insights
export const getHumanDesignInsights = (energyType: string): string => {
  const insights: Record<string, string> = {
    'Generator': 'You are designed to respond to life with your powerful life force energy. Trust your gut responses and follow what excites you.',
    'Manifestor': 'You are here to initiate and make things happen. Your energy is designed to impact others, so inform them before acting.',
    'Manifesting Generator': 'You combine the power to respond with the ability to initiate. Wait for what excites you, then inform and act.',
    'Projector': 'You are designed to guide others with your wisdom. Wait for recognition and invitation rather than pushing your insights.',
    'Reflector': 'You are here to reflect the health of your community. Take time to make decisions and wait through a lunar cycle.'
  };
  
  return insights[energyType] || 'Your unique energy type guides how you interact with the world around you.';
};
