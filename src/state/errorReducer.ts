// const initialState: InitialStateType = {
//   error: null,
// };
const initialState: InitialStateType = [];

// export const errorReducer = (
//   state: InitialStateType = initialState,
//   action: ActionsType,
// ): InitialStateType => {
//   switch (action.type) {
//     case 'APP/SET-ERROR': {
//       return action.error !== null
//         ? { ...state, error: `${state.error}, ${action.error}` }
//         : { ...state, error: action.error };
//     }
//     default:
//       return state;
//   }
// };

export const errorReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR': {
      return action.error !== null ? [...state, action.error] : [];
    }
    default:
      return state;
  }
};

export type InitialStateType = string[];

export const setErrorAC = (error: string | null) =>
  ({ type: 'APP/SET-ERROR', error } as const);

export type SetErrorActionType = ReturnType<typeof setErrorAC>;

type ActionsType = SetErrorActionType;
