export type TypeSearchTypes = 'city' | 'zip' | 'coordinates';

export type Themes = 'day' | 'night';

export type MainWeather = {
  feels_like: number | null;
  humidity: number | null;
  pressure: number | null;
  temp: number | null;
  temp_max: number | null;
  temp_min: number | null;
};

export type DataWeather = {
  base: string | null;
  clouds: {
    all: string | null;
  };
  cod: number | null;
  coord: {
    lat: number | null;
    lon: number | null;
  };
  dt: number | null;
  id: number | null;
  main: MainWeather;
  name: string | null;
  sys: {
    country: string | null;
    id: number | null;
    sunrise: number | null;
    sunset: number | null;
    type: number | null;
  };
  timezone: number | null;
  visibility: number | null;
  weather: [
    {
      id: number | null;
      main: string | null;
      description: string | null;
      icon: string | null;
    },
  ];
  wind: {
    deg: number | null;
    gust: number | null;
    speed: number | null;
  };
};

export type DataCallWeatherType = {
  cityName: string;
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  mainData: MainWeather;
  current: CurrentWeatherType;
  hourly: Array<HourlyDataType>;
  daily: Array<DailyDataType>;
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
