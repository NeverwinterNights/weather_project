import { Dispatch } from 'redux';

import { dataAPI } from '../api/apiData';

type ActionsType = SetCityNameActionType;

type DataStateType = {
  cityName: string | null;
};

const initialState: DataStateType = {
  cityName: null,
};

export const dataReducer = (
  state: DataStateType = initialState,
  action: ActionsType,
): DataStateType => {
  switch (action.type) {
    case 'SET-CITY-NAME': {
      return {
        ...state,
        cityName: action.name,
      };
    }
    default:
      return state;
  }
};

export const setCityNameAC = (name: string) =>
  ({
    type: 'SET-CITY-NAME',
    name,
  } as const);

export type SetCityNameActionType = ReturnType<typeof setCityNameAC>;

export const getDataByCityNameTC = (name: string) => (dispatch: Dispatch) => {
  dataAPI.getDataByCityName(name).then(() => {
    dispatch(setCityNameAC(name));
  });
};
