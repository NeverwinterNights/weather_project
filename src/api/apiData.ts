import axios from 'axios';

import {
  CityHintsResponse,
  CityResponseType,
  DataCallWeatherResponseType,
  DataWeatherResponseType,
} from '../types/types';

import { APIkey } from './constants';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

// api
export const weatherDataAPI = {
  getWeatherDataByCityName(cityName: string) {
    return instance.get<DataWeatherResponseType>(
      `weather?q=${cityName}&units=metric&appid=${APIkey}`,
    );
  },
  getWeatherDataFromCall(lat: number, lon: number) {
    return instance.get<DataCallWeatherResponseType>(
      `onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=${APIkey}`,
    );
  },
  getWeatherDataFromParams(lat: number, lon: number) {
    return instance.get<DataWeatherResponseType>(
      `weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`,
    );
  },

  getWeatherDataFromZip(zip: string, code: string) {
    return instance.get<DataWeatherResponseType>(
      `weather?zip=${zip},${code}&appid=${APIkey}`,
    );
  },
  // вынести в разную папку изменить назхвания
  getCity(name: string) {
    return axios.get<CityResponseType[]>(
      `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=n0sCB6fE383pJ65PYp8nu5T58wHsC7JL&q=${name}`,
    );
  },

  getLocationHints(name: string) {
    return axios.get<CityHintsResponse>(
      `https://api.opencagedata.com/geocode/v1/json?q=${name}&key=64a1714fbdda479ebb06a3fa9dbd5ba9&language=en`,
    );
  },
};
