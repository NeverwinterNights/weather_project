export type TypeSearchTypes = 'city' | 'zip' | 'coordinates';

export type Themes = 'day' | 'night';
export type TypeDataType = 'temperature' | 'humidity' | 'pressure';
export type MainWeather = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

export type DataWeatherResponseType = {
  base: string;
  clouds: {
    all: string;
  };
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: MainWeather;
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
};

export type DataWeatherType = {
  cityName: string;
  lat: number;
  lon: number;
  mainData: MainWeather;
  id: string;
  current: CurrentWeatherType;
  daily: Array<DailyDataType>;
  timezone: string;
};

export type DataCallWeatherResponseType = {
  current: CurrentWeatherType;
  lat: number;
  lon: number;
  daily: Array<DailyDataType>;
  timezone: string;
  timezone_offset: number;
};

export type DataCallWeatherType = DataCallWeatherResponseType & {
  cityName: string;
  mainData: MainWeather;
};

export type WeatherType = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type CurrentWeatherType = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherType[];
  rain: {
    '1h': number;
  };
};

export type HourlyDataType = {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherType[];
  pop: number;
};

export type DailyDataType = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherType[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
};

export type CityResponseType = {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  };
  Country: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
    Level: number;
    LocalizedType: string;
    EnglishType: string;
    CountryID: string;
  };
  TimeZone: {
    Code: string;
    Name: string;
    GmtOffset: number;
    IsDaylightSaving: boolean;
    NextOffsetChange: string;
  };
  GeoPosition: {
    Latitude: number;
    Longitude: number;
    Elevation: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
  };
  IsAlias: boolean;
  SupplementalAdminAreas: [
    {
      Level: number;
      LocalizedName: string;
      EnglishName: string;
    },
    {
      Level: number;
      LocalizedName: string;
      EnglishName: string;
    },
  ];
  DataSets: string[];
};

export type CityType = {
  ID: string;
  // AdministrativeArea: string;
  CountryID: string;
  CountryName: string;
  AdministrativeArea: string;
  CityName: string;
  lat: number;
  lot: number;
};

export type CityLoc = {
  annotations: {
    DMS: {
      lat: string;
      lng: string;
    };
    MGRS: string;
    Maidenhead: string;
    Mercator: {
      x: number;
      y: number;
    };
    OSM: {
      edit_url: string;
      note_url: string;
      url: string;
    };
    UN_M49: {
      regions: {
        AMERICAS: string;
        BR: string;
        LATIN_AMERICA: string;
        SOUTH_AMERICA: string;
        WORLD: string;
      };
      statistical_groupings: [string];
    };
    callingcode: number;
    currency: {
      decimal_mark: string;
      html_entity: string;
      iso_code: string;
      iso_numeric: string;
      name: string;
      smallest_denomination: number;
      subunit: string;
      subunit_to_unit: number;
      symbol: string;
      symbol_first: number;
      thousands_separator: string;
    };
    flag: string;
    geohash: string;
    qibla: number;
    roadinfo: {
      drive_on: string;
      road: string;
      road_type: string;
      speed_in: string;
    };
    sun: {
      rise: {
        apparent: number;
        astronomical: number;
        civil: number;
        nautical: number;
      };
      set: {
        apparent: number;
        astronomical: number;
        civil: number;
        nautical: number;
      };
    };
    timezone: {
      name: string;
      now_in_dst: number;
      offset_sec: number;
      offset_string: string;
      short_name: string;
    };
    what3words: {
      words: string;
    };
  };
  bounds: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
  components: {
    'ISO_3166-1_alpha-2': string;
    'ISO_3166-1_alpha-3': string;
    _category: string;
    _type: string;
    city?: string;
    town?: string;
    village?: string;
    city_district: string;
    continent: string;
    country: string;
    country_code: string;
    county: string;
    municipality: string;
    postcode: string;
    region: string;
    road: string;
    road_type: string;
    state: string;
    state_code: string;
    state_district: string;
    suburb: string;
  };
  confidence: number;
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  };
};

export type CityHintsResponse = {
  documentation: string;
  licenses: [
    {
      name: string;
      url: string;
    },
  ];
  rate: {
    limit: number;
    remaining: number;
    reset: number;
  };
  results: CityLoc[];
  status: {
    code: number;
    message: string;
  };
  stay_informed: {
    blog: string;
    twitter: string;
  };
  thanks: string;
  timestamp: {
    created_http: string;
    created_unix: number;
  };
  total_results: number;
};
