import React, { useEffect } from 'react';

import './App.css';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import { WeatherCard } from './components/card/WeatherCard';
import { Current } from './components/current/Current';
import { Favorites } from './components/favorites/Favorites';
import { Header } from './components/header/Header';
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
  // const dataWeather = useSelector<AppRootStateType, DataCallWeatherType>(
  //   state => state.callReducer,
  // );
  const favoritesCity = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.favoritesReducer,
  );

  const time = useSelector<AppRootStateType, string>(state => state.appReducer.time);
  const dispatch = useDispatch();
  const { latitude, longitude, error } = usePosition();

  useEffect(() => {
    dispatch(setTimeAC(dayjs().format('MMMM D, h:mm A')));
  }, []);

  useEffect(() => {
    const clock = setInterval(() => {
      // setTime(dayjs().format('MMMM D, h:mm A'));
      setTimeAC(dayjs().format('MMMM D, h:mm A'));
    }, 60000);
    return () => {
      clearInterval(clock);
    };
  }, [time]);

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(getCurrentDataTC(latitude, longitude));
      setInterval(() => {
        dispatch(getCurrentDataTC(latitude, longitude));
      }, 600000);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (favoritesCity.length === 0) {
      const myString = localStorage.getItem('state');
      if (myString) {
        const myState = JSON.parse(myString);
        dispatch(setFavoritesCitiesAC(myState as DataWeatherType[]));
      }
    }
  }, []);

  return (
    <div
      className="App"
      style={theme ? { backgroundColor: '#4fbb65' } : { backgroundColor: 'white' }}
    >
      <Favorites />
      <div className="main">
        <Header />
        {!error && <Current time={time} />}
        {/* {data.length !== 0 && dataWeather && <WeatherCard />} */}
        {data.map(city => (
          <WeatherCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
});
export default App;
