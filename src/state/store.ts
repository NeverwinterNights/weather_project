import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { AppActionsType, appReducer } from './appReducer';
import { CallActionsType } from './callReducer';
import { citiesReducer } from './citiesReducer';
import { CurrentActionsType, currentReducer } from './currentReducer';
import { DataActionsType, dataReducer } from './dataReducer';
import { errorReducer } from './errorReducer';
import { FavoritesActionsType, favoritesReducer } from './favoritesReducer';
import { themeReducer } from './themeReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  dataReducer,
  currentReducer,
  appReducer,
  favoritesReducer,
  citiesReducer,
  errorReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type ActionsType =
  | CurrentActionsType
  | DataActionsType
  | CallActionsType
  | AppActionsType
  | FavoritesActionsType;

// @ts-ignore
window.store = store;
