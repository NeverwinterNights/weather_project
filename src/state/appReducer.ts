export type AppActionsType = SetTimeActionType | SetTypeOfTemperatureActionType;

export type appStateType = {
  time: string;
  temperatureType: boolean;
};

const initialState: appStateType = { temperatureType: true } as appStateType;

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
