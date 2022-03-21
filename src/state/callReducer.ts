import { Dispatch } from 'redux';

import { dataAPI } from '../api/apiData';
import { DataCallWeatherType, MainWeather } from '../types/types';

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
  data: DataCallWeatherType,
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
  (dispatch: Dispatch) => {
    dataAPI.getDataFromCall(lat, lon).then(res => {
      dispatch(setDataCallAC(res.data, cityName, mainData));
      console.log(res.data);
    });
  };
