import axios from 'axios';

import { DataCallWeatherResponseType, DataWeatherResponseType } from '../types/types';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  // withCredentials: true,
});

const APIkey = '79cd292699d0cf9c0bcce86540c4ac0b';

// api
export const dataAPI = {
  getDataByCityName(cityName: string) {
    return instance.get<DataWeatherResponseType>(
      `weather?q=${cityName}&units=metric&appid=${APIkey}`,
    );
  },
  getDataFromCall(lat: number, lon: number) {
    return instance.get<DataCallWeatherResponseType>(
      `onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=${APIkey}`,
    );
  },
  getDataFromParams(lat: number, lon: number) {
    return instance.get<DataWeatherResponseType>(
      `weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`,
    );
  },

  getDataFromZip(zip: string, code: string) {
    return instance.get<DataWeatherResponseType>(
      `weather?zip=${zip},${code}&appid=${APIkey}`,
    );
  },
};
