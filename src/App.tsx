import React, { useEffect } from 'react';

import './App.css';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import { WeatherCard } from './components/card/WeatherCard';
import { CurrentTemperature } from './components/current/CurrentTemperature';
import { Favorites } from './components/favorites/Favorites';
import { Graphs } from './components/graphs/Graphs';
import { Header } from './components/header/Header';
import { CURRENT_TIME } from './components/utils/constans';
import { usePosition } from './hooks/usePosition';
import { setTimeAC } from './state/appReducer';
import { getCurrentDataTC } from './state/currentReducer';
import { DataWeatherType } from './state/dataReducer';
import { setFavoritesCitiesAC } from './state/favoritesReducer';
import { AppRootStateType } from './state/store';

const App = React.memo(() => {
  const theme = useSelector<AppRootStateType, boolean>(state => state.theme.dayNight);
  const data = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.dataReducer,
  );
  const favoritesCity = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.favoritesReducer,
  );
  const graphs = useSelector<AppRootStateType, boolean>(state => state.appReducer.graphs);

  const time = useSelector<AppRootStateType, string>(state => state.appReducer.time); // не пробрасывать
  const dispatch = useDispatch();
  const { latitude, longitude, error } = usePosition();

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

  return (
    <div
      className="App"
      style={theme ? { backgroundColor: '#4fbb65' } : { backgroundColor: 'white' }}
    >
      <Favorites />
      <div className="main">
        <Header />
        {!error && <CurrentTemperature />}
        {graphs ? (
          <Graphs />
        ) : (
          data.map(city => <WeatherCard key={city.id} city={city} />)
        )}
      </div>
    </div>
  );
});
export default App;
