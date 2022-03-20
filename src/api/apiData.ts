import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  // withCredentials: true,
});

const APIkey = '79cd292699d0cf9c0bcce86540c4ac0b';

// api
export const dataAPI = {
  getDataByCityName(cityName: string) {
    return instance.get(`weather?q=${cityName}&units=metric&appid=${APIkey}`);
  },
  getDataFromCall(lat: number, lon: number) {
    return instance.get(
      `onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly&appid=${APIkey}`,
    );
  },
  getDataFromParams(lat: number, lon: number) {
    return instance.get(`weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`);
  },
};

//
