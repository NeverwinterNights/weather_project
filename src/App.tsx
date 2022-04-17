import React, { ReactElement, useEffect } from 'react';

import './App.css';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { WeatherCardContainer } from './components/card/WeatherCardContainer';
import { CurrentTemperature } from './components/current/CurrentTemperature';
import { Error } from './components/error/Error';
import { Favorites } from './components/favorites/Favorites';
import { Graphs } from './components/graphs/Graphs';
import { Header } from './components/header/Header';
import { Map } from './components/map/Map';
import { CURRENT_TIME } from './components/utils/constans';
import { usePosition } from './hooks/usePosition';
import { setTimeAC, ViewModeType } from './state/appReducer';
import { getCurrentDataTC } from './state/currentReducer';
import { DataWeatherType } from './state/dataReducer';
import { setFavoritesCitiesAC } from './state/favoritesReducer';
import { AppRootStateType } from './state/store';

const StyledApp = styled.div`
  ${({ theme }) => theme.colors.body}
`;

type AppPropsType = {
  themeHandler: (value: boolean) => void;
};

const App = React.memo(({ themeHandler }: AppPropsType) => {
  // const theme = useSelector<AppRootStateType, boolean>(state => state.theme.dayNight);

  const favoritesCity = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.favoritesReducer,
  );
  const viewMode = useSelector<AppRootStateType, ViewModeType>(
    state => state.appReducer.viewMode,
  );

  const time = useSelector<AppRootStateType, string>(state => state.appReducer.time);

  const dispatch = useDispatch();
  const { latitude, longitude, error } = usePosition();

  const err = useSelector<AppRootStateType, string[]>(state => state.errorReducer);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [currentTheme, setCurrentTheme] = useTheme();
  useEffect(() => {
    if (!favoritesCity.length) {
      const myString = localStorage.getItem('state');
      if (myString) {
        const myState = JSON.parse(myString);
        dispatch(setFavoritesCitiesAC(myState as DataWeatherType[]));
      }
    }

    dispatch(setTimeAC(dayjs().format(CURRENT_TIME)));
  }, []);

  useEffect(() => {
    const clock = setInterval(() => {
      dispatch(setTimeAC(dayjs().format(CURRENT_TIME)));
    }, 60000);
    return () => {
      clearInterval(clock);
    };
  }, [time]);

  useEffect(() => {
    if (latitude) {
      dispatch(getCurrentDataTC(latitude, longitude));
      setInterval(() => {
        dispatch(getCurrentDataTC(latitude, longitude));
      }, 600000);
    }
  }, [latitude, longitude]);

  const componentRender = (): ReactElement => {
    switch (viewMode) {
      case 'card': {
        return <WeatherCardContainer />;
      }
      case 'graphs': {
        return <Graphs />;
      }
      case 'map': {
        return <Map />;
      }
      default:
        return <WeatherCardContainer />;
    }
  };

  return (
    <StyledApp>
      <div
        className="App"
        // style={theme ? { backgroundColor: '#4fbb65' } : { backgroundColor: 'white' }}
      >
        <Favorites />
        <div className="main">
          <Header themeHandler={themeHandler} />
          {!error && <CurrentTemperature />}
          {componentRender()}
        </div>
        {err && <Error />}
      </div>
    </StyledApp>
  );
});
export default App;
