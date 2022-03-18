import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { callReducer } from './callReducer';
import { dataReducer } from './dataReducer';
import { themeReducer } from './themeReducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  theme: themeReducer,
  dataReducer,
  callReducer,
});
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
