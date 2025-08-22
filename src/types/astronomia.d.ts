declare module 'astronomia' {
  export namespace julian {
    function Day(year: number, month: number, day: number): number;
    function Sidereal(jd: number): number;
    function CalendarGregorianToJD(year: number, month: number, day: number): number;
  }

  export namespace planetposition {
    class Planet {
      constructor(data: unknown);
      position2000(jd: number): unknown;
    }
  }

  export namespace solar {
    function apparentEquatorial(jd: number): { ra: number; dec: number };
    function apparentLongitude(jd: number): number;
  }

  export namespace moonposition {
    function position(jd: number): { lon: number; lat: number; range: number };
  }

  export namespace sidereal {
    function greenwichMean(jd: number): number;
  }

  export namespace nutation {
    function nutation(jd: number): [number, number];
    function meanObliquityLaskar(jd: number): number;
  }

  export namespace sexa {
    // Add if needed
  }

  export namespace coord {
    // Add if needed
  }
}

declare module 'astronomia/data/vsop87Bearth' {
  const earth: unknown;
  export default earth;
}

declare module 'astronomia/data/vsop87Bmars' {
  const mars: unknown;
  export default mars;
}

declare module 'astronomia/data/vsop87Bvenus' {
  const venus: unknown;
  export default venus;
}

declare module 'astronomia/data/vsop87Bjupiter' {
  const jupiter: unknown;
  export default jupiter;
}

declare module 'astronomia/data/vsop87Bsaturn' {
  const saturn: unknown;
  export default saturn;
}

declare module 'astronomia/data/vsop87Bmercury' {
  const mercury: unknown;
  export default mercury;
}
