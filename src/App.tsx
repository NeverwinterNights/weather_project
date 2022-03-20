import React, { useEffect } from 'react';

import './App.css';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import { WeatherCard } from './components/card/WeatherCard';
import { Current } from './components/current/Current';
import { Header } from './components/header/Header';
import { usePosition } from './hooks/usePosition';
import { setTimeAC } from './state/appReducer';
import { getDataByCallTC } from './state/callReducer';
import { getCurrentDataTC } from './state/currentReducer';
import { DataWeatherType } from './state/dataReducer';
import { AppRootStateType } from './state/store';
import { DataCallWeatherType } from './types/types';

const App = React.memo(() => {
  const theme = useSelector<AppRootStateType, boolean>(state => state.theme.dayNight);
  const data = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.dataReducer,
  );
  const dataWeather = useSelector<AppRootStateType, DataCallWeatherType>(
    state => state.callReducer,
  );
  const time = useSelector<AppRootStateType, string>(state => state.appReducer.time);
  const dispatch = useDispatch();
  const { latitude, longitude } = usePosition();

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
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (data.length !== 0) {
      data.map(city =>
        dispatch(getDataByCallTC(city.lat, city.lon, city.cityName, city.mainData)),
      );
    }
  }, [data]);

  return (
    <div
      className="App"
      style={theme ? { backgroundColor: '#4fbb65' } : { backgroundColor: 'white' }}
    >
      <Header />
      <Current time={time} />
      {data.length !== 0 && dataWeather && <WeatherCard />}
    </div>
  );
});
export default App;
