import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { v1 } from 'uuid';

import { dataAPI } from '../api/apiData';
import { CurrentWeatherType, DailyDataType, MainWeather } from '../types/types';
import { handleThunk } from '../utils/thunks-utils';

import { ActionsType, AppRootStateType } from './store';

export type DataActionsType =
  | SetCityNameActionType
  | AddActionType
  | DeleteCityActionType
  | GetDataFromLocationActionType;

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

const initialState: DataWeatherType[] = [] as DataWeatherType[];

export const dataReducer = (
  state: DataWeatherType[] = initialState,
  action: DataActionsType,
): DataWeatherType[] => {
  switch (action.type) {
    case 'SET-DATA': {
      return [
        ...state,
        {
          cityName: action.cityName,
          lat: action.lat,
          lon: action.lon,
          mainData: action.mainData,
          id: action.id,
          current: {} as CurrentWeatherType,
          daily: [],
          timezone: '',
        },
      ];
    }
    case 'SET-ADD-DATA': {
      const copyState = [...state];
      return copyState.map(city =>
        action.id === city.id
          ? {
              ...city,
              current: action.current,
              daily: action.daily,
              timezone: action.timezone,
            }
          : { ...city },
      );
    }
    case 'DELETE-CITY': {
      const copyState = [...state];
      return copyState.filter(city => city.id !== action.id);
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
  id: string,
) =>
  ({
    type: 'SET-DATA',
    cityName,
    lat,
    lon,
    mainData,
    id,
  } as const);

export type SetCityNameActionType = ReturnType<typeof setDataCityNameAC>;

export const addDataAC = (
  current: CurrentWeatherType,
  daily: Array<DailyDataType>,
  timezone: string,
  id: string,
) =>
  ({
    type: 'SET-ADD-DATA',
    current,
    daily,
    timezone,
    id,
  } as const);

export type AddActionType = ReturnType<typeof addDataAC>;

export const deleteCityAC = (id: string) =>
  ({
    type: 'DELETE-CITY',
    id,
  } as const);

export type DeleteCityActionType = ReturnType<typeof deleteCityAC>;

export const getDataFromLocationAC = () =>
  ({
    type: 'GET-DATA-FROM-LOCATION',
  } as const);

export type GetDataFromLocationActionType = ReturnType<typeof getDataFromLocationAC>;

export const additionalTC =
  (lat: number, lon: number, id: string) => (dispatch: Dispatch) => {
    dataAPI.getDataFromCall(lat, lon).then(res => {
      dispatch(addDataAC(res.data.current, res.data.daily, res.data.timezone, id));
    });
  };

export const getDataByCityNameTC =
  (name: string): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
  dispatch => {
    const id: string = v1();
    dataAPI.getDataByCityName(name).then(res => {
      handleThunk(
        dispatch,
        res.data.name,
        res.data.coord.lat,
        res.data.coord.lon,
        res.data.main,
        id,
      );
      dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id));
    });
  };

export const getDataByLocationTC =
  (lat: number, lon: number): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
  dispatch => {
    const id: string = v1();
    dataAPI.getDataFromParams(lat, lon).then(res => {
      handleThunk(
        dispatch,
        res.data.name,
        res.data.coord.lat,
        res.data.coord.lon,
        res.data.main,
        id,
      );
      dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id));
    });
  };

export const getDataByZipCodeTC =
  (
    zip: string,
    code: string,
  ): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
  dispatch => {
    const id: string = v1();
    dataAPI.getDataFromZip(zip, code).then(res => {
      handleThunk(
        dispatch,
        res.data.name,
        res.data.coord.lat,
        res.data.coord.lon,
        res.data.main,
        id,
      );
      dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id));
    });
  };
