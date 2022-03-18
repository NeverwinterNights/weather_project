import React, { useEffect } from 'react';

import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import { WeatherCard } from './components/card/WeatherCard';
import { Header } from './components/header/Header';
import { getDataByCallTC } from './state/callReducer';
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
  const dispatch = useDispatch();

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
      {data.length !== 0 && dataWeather && <WeatherCard />}
    </div>
  );
});
export default App;
