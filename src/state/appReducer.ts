import { TypeDataType } from '../types/types';

export type AppActionsType =
  | SetTimeActionType
  | SetGraphsActionType
  | SetTypeOfTemperatureActionType
  | ChangeFavoritesActionType
  | ChangeGraphsTypeActionType;

export type ViewModeType = 'graphs' | 'map' | 'card';

export type appStateType = {
  time: string;
  temperatureType: boolean;
  viewMode: ViewModeType;
  typeData: TypeDataType;
  favorite: boolean;
};

const initialState: appStateType = {
  temperatureType: true,
  viewMode: 'card',
  typeData: 'temperature',
  favorite: false,
} as appStateType;

export const appReducer = (
  state: appStateType = initialState,
  action: AppActionsType,
): appStateType => {
  switch (action.type) {
    case 'SET-TIME': {
      return {
        ...state,
        time: action.time,
      };
    }
    case 'SET-TYPE-TEMPERATURE': {
      return {
        ...state,
        temperatureType: action.value,
      };
    }
    case 'SET-GRAPHS': {
      return {
        ...state,
        viewMode: action.value,
      };
    }
    case 'CHANGE-GRAPHS-TYPE': {
      return {
        ...state,
        typeData: action.value,
      };
    }
    case 'CHANGE-FAVORITES': {
      return {
        ...state,
        favorite: action.value,
      };
    }
    default:
      return state;
  }
};

export const setTimeAC = (time: string) =>
  ({
    type: 'SET-TIME',
    time,
  } as const);

export type SetTimeActionType = ReturnType<typeof setTimeAC>;

export const setTypeOfTemperatureAC = (value: boolean) =>
  ({
    type: 'SET-TYPE-TEMPERATURE',
    value,
  } as const);

export type SetTypeOfTemperatureActionType = ReturnType<typeof setTypeOfTemperatureAC>;

export const setGraphsAC = (value: ViewModeType) =>
  ({
    type: 'SET-GRAPHS',
    value,
  } as const);

export type SetGraphsActionType = ReturnType<typeof setGraphsAC>;

export const changeGraphsTypeAC = (value: TypeDataType) =>
  ({
    type: 'CHANGE-GRAPHS-TYPE',
    value,
  } as const);

export type ChangeGraphsTypeActionType = ReturnType<typeof changeGraphsTypeAC>;

export const changeFavoritesAC = (value: boolean) =>
  ({
    type: 'CHANGE-FAVORITES',
    value,
  } as const);

export type ChangeFavoritesActionType = ReturnType<typeof changeFavoritesAC>;
