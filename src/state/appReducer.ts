export type AppActionsType =
  | SetTimeActionType
  | SetGraphsActionType
  | SetTypeOfTemperatureActionType;

export type appStateType = {
  time: string;
  temperatureType: boolean;
  graphs: boolean;
};

const initialState: appStateType = {
  temperatureType: true,
  graphs: false,
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
        graphs: action.value,
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

export const setGraphsAC = (value: boolean) =>
  ({
    type: 'SET-GRAPHS',
    value,
  } as const);

export type SetGraphsActionType = ReturnType<typeof setGraphsAC>;
