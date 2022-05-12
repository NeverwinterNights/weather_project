import { Dispatch } from 'redux';

import { weatherDataAPI } from '../api/apiData';
import {
  DataCallWeatherResponseType,
  DataCallWeatherType,
  MainWeather,
} from '../types/types';

export type CallActionsType = SetCallActionType;

const initialState: DataCallWeatherType = {} as DataCallWeatherType;

export const callReducer = (
  state: DataCallWeatherType = initialState,
  action: CallActionsType,
): DataCallWeatherType => {
  switch (action.type) {
    case 'SET-DATA-CALL': {
      return {
        ...state,
        ...action.data,
        cityName: action.cityName,
        mainData: action.mainData,
      };
    }
    default:
      return state;
  }
};

export const setDataCallAC = (
  data: DataCallWeatherResponseType,
  cityName: string,
  mainData: MainWeather,
) =>
  ({
    type: 'SET-DATA-CALL',
    data,
    cityName,
    mainData,
  } as const);

export type SetCallActionType = ReturnType<typeof setDataCallAC>;

export const getDataByCallTC =
  (lat: number, lon: number, cityName: string, mainData: MainWeather) =>
  async (dispatch: Dispatch) => {
    const res = await weatherDataAPI.getWeatherDataFromCall(lat, lon);
    try {
      dispatch(setDataCallAC(res.data, cityName, mainData));
    } catch (e) {
      console.log(e);
    }
  };
