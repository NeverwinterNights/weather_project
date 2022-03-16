import axios from 'axios';

const instance = axios.create({
  baseURL: 'api.openweathermap.org/data/2.5/weather?',
  withCredentials: true,
});

const APIkey = '79cd292699d0cf9c0bcce86540c4ac0b';

// api
export const dataAPI = {
  getDataByCityName(cityName: string) {
    return instance.get(`q=${cityName}&appid=${APIkey}`);
  },
};
