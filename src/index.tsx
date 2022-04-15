import React, { ReactElement } from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import './index.css';

import App from './App';
import useTheme from './hooks/useTheme.hooks';
import reportWebVitals from './reportWebVitals';
import { store } from './state/store';

const WrappedWithTheme = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTheme, setCurrentTheme] = useTheme();
  console.log(currentTheme);
  return (
    <ThemeProvider theme={currentTheme}>
      {/* <StyledApp> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </StyledApp> */}
    </ThemeProvider>
  );
};

ReactDOM.render(<WrappedWithTheme />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
