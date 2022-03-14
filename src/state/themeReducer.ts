export type ThemeStateType = {
  dayNight: boolean;
};

type ActionsType = DayNightActionType;

const initialState: ThemeStateType = {
  dayNight: false,
};

export const themeReducer = (
  state: ThemeStateType = initialState,
  action: ActionsType,
): ThemeStateType => {
  switch (action.type) {
    case 'CHANGE-THEME': {
      return { ...state, dayNight: action.value };
    }
    default:
      return state;
  }
};

export const dayNightAC = (value: boolean) =>
  ({
    type: 'CHANGE-THEME',
    value,
  } as const);

export type DayNightActionType = ReturnType<typeof dayNightAC>;
