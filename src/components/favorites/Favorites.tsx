import React from 'react';

import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import { DataWeatherType } from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';
import { Icon } from '../icon/Icon';

import style from './Favorites.module.scss';

export const Favorites = React.memo(() => {
  const favoritesCity = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.favoritesReducer,
  );

  return (
    <div className={style.main}>
      {favoritesCity &&
        favoritesCity.map(city => (
          <div key={city.id} className={style.card}>
            <div className={style.body}>
              <div className={style.icon}>
                <Icon name={city.current.weather[0].icon} size={2} />
              </div>
              <div className={style.name}>{city.cityName} </div>
              <div className={style.date}>
                {dayjs().tz(city.timezone).format('MMMM D, h:mm A')}
              </div>
              <div className={style.temp}>Temperature - {city.current.temp}</div>
              <div className={style.hum}>Humidity - {city.current.humidity}</div>
              <div className={style.wind}>Wind speed - {city.current.wind_speed}</div>
            </div>
          </div>
        ))}
    </div>
  );
});
