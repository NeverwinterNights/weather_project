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
  AdministrativeArea: string;
  CountryID: string;
  CountryName: string;
  CityName: string;
  lat: number;
  lot: number;
};
