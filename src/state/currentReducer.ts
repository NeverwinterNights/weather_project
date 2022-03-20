import { Dispatch } from 'redux';

import { dataAPI } from '../api/apiData';
import { DataWeatherResponseType } from '../types/types';

type ActionsType = SetCurrentActionType;

const initialState: DataWeatherResponseType = {} as DataWeatherResponseType;

export const currentReducer = (
  state: DataWeatherResponseType = initialState,
  action: ActionsType,
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

export const getCurrentDataTC = (lat: number, lon: number) => (dispatch: Dispatch) => {
  dataAPI.getDataFromParams(lat, lon).then(res => {
    dispatch(setCurrentDataAC(res.data));
  });
};
