import { Dispatch } from 'redux';

import { setDataCityNameAC } from '../state/dataReducer';
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
