import React, { useEffect, useState } from 'react';

import './App.css';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { WeatherCardContainer } from './components/card/WeatherCardContainer';
import { CurrentTemperature } from './components/current/CurrentTemperature';
import { Error } from './components/error/Error';
import { FavMenu } from './components/favorites/FavMenu/FavMenu';
import { Header } from './components/header/Header';
import { MenuTheme } from './components/menuTheme/MenuTheme';
import { CURRENT_TIME } from './components/utils/constans';
import { usePosition } from './hooks/usePosition';
import { setTimeAC } from './state/appReducer';
import { getCurrentDataTC } from './state/currentReducer';
import { DataWeatherType } from './state/dataReducer';
import { setFavoritesCitiesAC } from './state/favoritesReducer';
import { AppRootStateType } from './state/store';

const StyledApp = styled.div`
  ${({ theme }) => theme.colors.body}
`;

const App = React.memo(() => {
  const favoritesCity = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.favoritesReducer,
  );
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const time = useSelector<AppRootStateType, string>(state => state.appReducer.time);
  const dispatch = useDispatch();
  const { latitude, longitude, error } = usePosition();
  const err = useSelector<AppRootStateType, string[]>(state => state.errorReducer);

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

  const onClickGearHandler = (): void => {
    setMenuActive(!menuActive);
  };

  return (
    <StyledApp>
      <div className="App">
        <Header onClickGearHandler={onClickGearHandler} menuActive={menuActive} />
        <MenuTheme open={menuActive} />
        {/* <Favorites /> */}
        <FavMenu />
        <div className="main">
          {!error && <CurrentTemperature />}
          <WeatherCardContainer />
        </div>
        {err && <Error />}
      </div>
    </StyledApp>
  );
});
export default App;
