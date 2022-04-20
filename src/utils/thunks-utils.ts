import axios from 'axios';
import { Dispatch } from 'redux';

import { setDataCityNameAC } from '../state/dataReducer';
import { setErrorAC } from '../state/errorReducer';
import { MainWeather } from '../types/types';

export const handleThunk = (
  dispatch: Dispatch,
  name: string,
  lat: number,
  lon: number,
  main: MainWeather,
  id: string,
): void => {
  dispatch(setDataCityNameAC(name, lat, lon, main, id));
};

export const utilsError = (err: any, dispatch: Dispatch): void => {
  if (axios.isAxiosError(err) && err.response) {
    dispatch(setErrorAC(err.response.data.message));
  }
};
