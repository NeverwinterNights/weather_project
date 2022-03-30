import axios from 'axios';

import {
  CityResponseType,
  DataCallWeatherResponseType,
  DataWeatherResponseType,
} from '../types/types';

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
  getCity(name: string) {
    return axios.get<CityResponseType[]>(
      `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=n0sCB6fE383pJ65PYp8nu5T58wHsC7JL&q=${name}`,
    );
  },
};
