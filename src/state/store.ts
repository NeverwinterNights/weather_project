import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { AppActionsType, appReducer } from './appReducer';
import { CallActionsType } from './callReducer';
import { citiesReducer } from './citiesReducer';
import { CurrentActionsType, currentReducer } from './currentReducer';
import { DataActionsType, dataReducer } from './dataReducer';
import { FavoritesActionsType, favoritesReducer } from './favoritesReducer';
import { themeReducer } from './themeReducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  theme: themeReducer,
  dataReducer,
  currentReducer,
  appReducer,
  favoritesReducer,
  citiesReducer,
});
// непосредственно создаём store

export const store = createStore(rootReducer, applyMiddleware(thunk));
// export const store = createStore(rootReducer, loadState(), applyMiddleware(thunk));

// store.subscribe(() => {
//   // localStorage.setItem('state', JSON.stringify(store.getState().favoritesReducer));
//   saveState({
//     favoritesReducer: store.getState().favoritesReducer,
//   });
// });

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type ActionsType =
  | CurrentActionsType
  | DataActionsType
  | CallActionsType
  | AppActionsType
  | FavoritesActionsType;

// store.subscribe(() => {
//   localStorage.setItem('state', JSON.stringify(store.getState().favoritesReducer));
// });

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
