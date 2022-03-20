import React from 'react';

// import * as dayjs from 'dayjs';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useSelector } from 'react-redux';

import moon from '../../image/moon.svg';
import sun from '../../image/sun.svg';
import { AppRootStateType } from '../../state/store';
import { DataCallWeatherType } from '../../types/types';
import { Icon } from '../icon/Icon';

import style from './WeatherCard.module.scss';

dayjs.extend(utc);
dayjs.extend(timezone);

export const WeatherCard = React.memo(() => {
  const dataWeather = useSelector<AppRootStateType, DataCallWeatherType>(
    state => state.callReducer,
  );

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <button type="button">closed</button>
      </div>
      <div className={style.up}>
        <div className={style.city}>{dataWeather.cityName}</div>
        <div className={style.time}>
          {dayjs().tz(dataWeather.timezone).format('MMMM D, h:mm A')}
        </div>
      </div>
      <div className={style.main}>
        <div className={style.info}>
          <Icon name={dataWeather.current?.weather[0].icon} />
          <div className={style.temp}>
            {dataWeather.current?.temp} <span>&deg;C</span>
          </div>
        </div>
        <div className="block">
          <div className={`${style.item} ${style.min}`}>
            <span>Minimum temp. </span>
            {dataWeather.daily && dataWeather.daily[0]?.temp.min} &deg;C
          </div>
          <div className={`${style.item} ${style.max}`}>
            <span>Maximum temp.</span>
            {dataWeather.daily && dataWeather.daily[0]?.temp.max} &deg;C
          </div>
          <div className={`${style.item} ${style.feels}`}>
            <span>Feels like</span> {dataWeather.mainData?.feels_like} &deg;C
          </div>
          <div className={`${style.item} ${style.day}`}>
            <span>Day temp.</span> {dataWeather.daily && dataWeather.daily[0]?.temp.day}
            &deg;C
          </div>
          <div className={`${style.item} ${style.night}`}>
            <span>Night temp. </span>
            {dataWeather.daily && dataWeather.daily[0]?.temp.night}&deg;C
          </div>
        </div>
        <div className="block">
          <div className={`${style.item} ${style.humidity}`}>
            <span>Humidity</span> {dataWeather.current?.humidity} %
          </div>
          <div className={`${style.item} ${style.pressure}`}>
            <span>Pressure</span>
            {dataWeather.current?.pressure} mmHg
          </div>
          <div className={`${style.item} ${style.wind}`}>
            <span>Wind Speed</span> {dataWeather.current?.wind_speed} m/s
          </div>
        </div>
      </div>
      <div className={style.footer}>
        {dataWeather.daily &&
          dataWeather.daily.map(day => (
            <div key={day.dt} className={style.elem}>
              <div className={style.row}>{`${dayjs.unix(day.dt).format('MMMM D')}`}</div>
              <div className={style.row}>{`${dayjs.unix(day.dt).format('dddd')}`}</div>
              <div className={style.row}>
                <img src={sun} alt="" /> {day.temp.max}
              </div>
              <div className={style.row}>
                <img src={moon} alt="" /> {day.temp.min}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});
