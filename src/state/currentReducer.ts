import { Dispatch } from 'redux';

import { weatherDataAPI } from '../api/apiData';
import { DataWeatherResponseType } from '../types/types';

export type CurrentActionsType = SetCurrentActionType;

const initialState: DataWeatherResponseType = {} as DataWeatherResponseType;

export const currentReducer = (
  state: DataWeatherResponseType = initialState,
  action: CurrentActionsType,
): DataWeatherResponseType => {
  switch (action.type) {
    case 'SET-CURRENT-DATA': {
      return {
        ...action.data,
      };
    }
    default:
      return state;
  }
};

export const setCurrentDataAC = (data: DataWeatherResponseType) =>
  ({
    type: 'SET-CURRENT-DATA',
    data,
  } as const);

export type SetCurrentActionType = ReturnType<typeof setCurrentDataAC>;

export const getCurrentDataTC =
  (lat: number, lon: number) => async (dispatch: Dispatch) => {
    const res = await weatherDataAPI.getWeatherDataFromParams(lat, lon);
    try {
      dispatch(setCurrentDataAC(res.data));
    } catch (e) {
      console.log(e);
    }
  };
