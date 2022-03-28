import React from 'react';

// import * as dayjs from 'dayjs';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useDispatch, useSelector } from 'react-redux';

import moon from '../../image/moon.svg';
import sun from '../../image/sun.svg';
import { DataWeatherType, deleteCityAC } from '../../state/dataReducer';
import { addCityAC } from '../../state/favoritesReducer';
import { AppRootStateType } from '../../state/store';
import { changeTemp } from '../../utils/utils';
import { Icon } from '../icon/Icon';

import style from './WeatherCard.module.scss';

dayjs.extend(utc);
dayjs.extend(timezone);

type WeatherCardPropsType = {
  city: DataWeatherType;
};

export const WeatherCard = React.memo(({ city }: WeatherCardPropsType) => {
  const tempType = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.temperatureType,
  );
  const favoritesCity = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.favoritesReducer,
  );

  const dispatch = useDispatch();

  const onClosedHandler = (): void => {
    dispatch(deleteCityAC(city.id));
  };

  const onAddToFavoritesHandler = (): void => {
    dispatch(addCityAC(city));
    localStorage.setItem('state', JSON.stringify([...favoritesCity, city]));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <button onClick={onAddToFavoritesHandler} type="button">
          add to fav
        </button>
        <button onClick={onClosedHandler} type="button">
          closed
        </button>
      </div>
      <div className={style.up}>
        <div className={style.city}>{city.cityName}</div>
        <div className={style.time}>
          {city.timezone && dayjs().tz(city.timezone).format('MMMM D, h:mm A')}
        </div>
      </div>
      <div className={style.main}>
        <div className={style.info}>
          {Object.keys(city.current).length && city.current.weather[0] ? (
            <Icon name={city.current.weather[0].icon} size={4} />
          ) : null}
          <div className={style.temp}>
            {changeTemp(tempType, Math.round(city.current?.temp))}{' '}
            {tempType ? <span>&deg;C</span> : <span>&deg;F</span>}
          </div>
        </div>
        <div className="block">
          <div className={`${style.item} ${style.min}`}>
            <span>Minimum temp. </span>
            {city.daily && changeTemp(tempType, Math.round(city.daily[0]?.temp.min))}{' '}
            {tempType ? <span>&deg;C</span> : <span>&deg;F</span>}
          </div>
          <div className={`${style.item} ${style.max}`}>
            <span>Maximum temp.</span>
            {city.daily && changeTemp(tempType, Math.round(city.daily[0]?.temp.max))}{' '}
            {tempType ? <span>&deg;C</span> : <span>&deg;F</span>}
          </div>
          <div className={`${style.item} ${style.feels}`}>
            <span>Feels like</span>{' '}
            {changeTemp(tempType, Math.round(city.mainData?.feels_like))}{' '}
            {tempType ? <span>&deg;C</span> : <span>&deg;F</span>}
          </div>
          <div className={`${style.item} ${style.day}`}>
            <span>Day temp.</span>{' '}
            {city.daily && changeTemp(tempType, Math.round(city.daily[0]?.temp.day))}{' '}
            {tempType ? <span>&deg;C</span> : <span>&deg;F</span>}
          </div>
          <div className={`${style.item} ${style.night}`}>
            <span>Night temp. </span>
            {city.daily &&
              changeTemp(tempType, Math.round(city.daily[0]?.temp.night))}{' '}
            {tempType ? <span>&deg;C</span> : <span>&deg;F</span>}
          </div>
        </div>
        <div className="block">
          <div className={`${style.item} ${style.humidity}`}>
            <span>Humidity</span> {city.current?.humidity} %
          </div>
          <div className={`${style.item} ${style.pressure}`}>
            <span>Pressure</span>
            {city.current?.pressure} mmHg
          </div>
          <div className={`${style.item} ${style.wind}`}>
            <span>Wind Speed</span> {city.current?.wind_speed} m/s
          </div>
        </div>
      </div>
      <div className={style.footer}>
        {city.daily &&
          city.daily.map(day => (
            <div key={day.dt} className={style.elem}>
              <div className={style.row}>{`${dayjs.unix(day.dt).format('MMMM D')}`}</div>
              <div className={style.row}>{`${dayjs.unix(day.dt).format('dddd')}`}</div>
              <div className={style.row}>
                <img src={sun} alt="" /> {changeTemp(tempType, Math.round(day.temp.max))}{' '}
                {tempType ? <span>&deg;C</span> : <span>&deg;F</span>}
              </div>
              <div className={style.row}>
                <img src={moon} alt="" /> {changeTemp(tempType, Math.round(day.temp.min))}{' '}
                {tempType ? <span>&deg;C</span> : <span>&deg;F</span>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});
