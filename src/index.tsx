// import React, { ReactElement } from 'react';
//
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { ThemeProvider } from 'styled-components';
//
// import themes from '../theme/schema';
//
// import './index.css';
//
// import App from './App';
// import useTheme from './hooks/useTheme.hooks';
// import reportWebVitals from './reportWebVitals';
// import { store } from './state/store';
//
// const WrappedWithTheme = (): ReactElement => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [currentTheme, setCurrentTheme] = useTheme();
//   // console.log(currentTheme);
//   const themeHandler = (value: boolean): void => {
//     if (value) {
//       setCurrentTheme(themes.data.Light);
//     } else {
//       setCurrentTheme(themes.data['Sea Wave']);
//     }
//   };
//   return (
//     <ThemeProvider theme={currentTheme}>
//       {/* <StyledApp> */}
//       <Provider store={store}>
//         <App themeHandler={themeHandler} />
//       </Provider>
//       {/* </StyledApp> */}
//     </ThemeProvider>
//   );
// };
//
// ReactDOM.render(<WrappedWithTheme />, document.getElementById('root'));
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React, { ReactElement } from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import themes from '../theme/schema';

import App from './App';
import useLocalStorage from './hooks/useLocalStorage.hook';
import useTheme from './hooks/useTheme.hooks';
import { store } from './state/store';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

const StyledApp = styled.div`
  ${({ theme }) => theme.colors.body}
`;

const WrappedWithTheme = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allThemes /* setAvailableThemes */] = useLocalStorage('all-themes', themes);
  const [currentTheme] = useTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <Provider store={store}>
        <StyledApp>
          <App />
        </StyledApp>
      </Provider>
    </ThemeProvider>
  );
};
root.render(<WrappedWithTheme />);
