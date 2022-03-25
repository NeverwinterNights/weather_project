import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { AppActionsType, appReducer } from './appReducer';
import { CallActionsType } from './callReducer';
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
});
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type ActionsType =
  | CurrentActionsType
  | DataActionsType
  | CallActionsType
  | AppActionsType
  | FavoritesActionsType;
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
