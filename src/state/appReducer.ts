type ActionsType = SetTimeActionType;

export type appStateType = {
  time: string;
};

const initialState: appStateType = {} as appStateType;

export const appReducer = (
  state: appStateType = initialState,
  action: ActionsType,
): appStateType => {
  switch (action.type) {
    case 'SET-TIME': {
      return {
        ...state,
        time: action.time,
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
