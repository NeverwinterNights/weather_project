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
