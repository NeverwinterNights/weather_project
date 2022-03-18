import { Dispatch } from 'redux';

import { dataAPI } from '../api/apiData';
import { MainWeather } from '../types/types';

type ActionsType = SetCityNameActionType;

export type DataWeatherType = {
  cityName: string;
  lat: number;
  lon: number;
  mainData: MainWeather;
};

const initialState: DataWeatherType[] = [] as DataWeatherType[];

export const dataReducer = (
  state: DataWeatherType[] = initialState,
  action: ActionsType,
): DataWeatherType[] => {
  switch (action.type) {
    case 'SET-DATA': {
      return [
        // ...state,
        {
          cityName: action.cityName,
          lat: action.lat,
          lon: action.lon,
          mainData: action.mainData,
        },
      ];
    }
    default:
      return state;
  }
};

export const setDataCityNameAC = (
  cityName: string,
  lat: number,
  lon: number,
  mainData: MainWeather,
) =>
  ({
    type: 'SET-DATA',
    cityName,
    lat,
    lon,
    mainData,
  } as const);

export type SetCityNameActionType = ReturnType<typeof setDataCityNameAC>;

export const getDataByCityNameTC = (name: string) => (dispatch: Dispatch) => {
  dataAPI.getDataByCityName(name).then(res => {
    dispatch(
      setDataCityNameAC(
        res.data.name,
        res.data.coord.lat,
        res.data.coord.lon,
        res.data.main,
      ),
    );
    console.log(res.data);
  });
};
