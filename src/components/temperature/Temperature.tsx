import React, { useMemo } from 'react';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useSelector } from 'react-redux';

import { AppRootStateType } from '../../state/store';
import { changeTemp, fromPascalToMM } from '../../utils/utils';
import { IconWeather } from '../icon/iconWeather/IconWeather';
import { CURRENT_TIME } from '../utils/constans';
import { WeekForecast } from '../weekForecast/WeekForecast';

import style from './Temperature.module.scss';
import { WeatherCardPropsType } from './types';

dayjs.extend(utc);
dayjs.extend(timezone);

export const Temperature = React.memo(
  ({ city, selectedTempType }: WeatherCardPropsType) => {
    const tempType = useSelector<AppRootStateType, boolean>(
      state => state.appReducer.temperatureType,
    );

    const CardTemp = useMemo(
      () => ({
        current: changeTemp(tempType, Math.round(city.current.temp)),
        min: changeTemp(tempType, Math.round(city.daily[0]?.temp.min)),
        max: changeTemp(tempType, Math.round(city.daily[0]?.temp.max)),
        feels: changeTemp(tempType, Math.round(city.mainData?.feels_like)),
        day: changeTemp(tempType, Math.round(city.daily[0]?.temp.day)),
        night: changeTemp(tempType, Math.round(city.daily[0]?.temp.night)),
        humidity: city.current?.humidity,
        pressure: fromPascalToMM(city.current?.pressure),
        wind: Math.round(city.current?.wind_speed),
      }),
      [city.current, city.mainData, city.daily, tempType],
    );
    return (
      <div className={style.wrapper}>
        <div className={style.up}>
          <div className={style.city}>{city.cityName}</div>
          <div className={style.country}>{city.country ? `(${city.country})` : ''}</div>
          <div className={style.time}>
            {city.timezone && dayjs().tz(city.timezone).format(CURRENT_TIME)}
          </div>
        </div>
        <div className={style.main}>
          <div className={style.info}>
            {Object.keys(city.current).length && city.current.weather[0] ? (
              <IconWeather name={city.current.weather[0].icon} size={4} />
            ) : null}
            <div className={style.temp}>{`${CardTemp.current} ${selectedTempType}`}</div>
          </div>
          <div className={style.block}>
            <div className={style.item}>
              {`Minimum temp. ${CardTemp.min} ${selectedTempType}`}
            </div>
            <div className={style.item}>
              {`Maximum temp. ${CardTemp.max} ${selectedTempType}`}
            </div>
            <div className={style.item}>
              {`Feels like ${CardTemp.feels} ${selectedTempType}`}
            </div>
            <div className={style.item}>
              {`Day temp. ${CardTemp.day} ${selectedTempType}`}
            </div>
            <div className={style.item}>
              {`Night temp. ${CardTemp.night} ${selectedTempType}`}
            </div>
          </div>
          <div className={style.block}>
            <div className={style.item}> {`Humidity ${CardTemp.humidity} %`}</div>
            <div className={style.item}>{`Pressure ${CardTemp.pressure} mmHg`}</div>
            <div className={style.item}>{`Wind Speed ${CardTemp.wind} m/s`}</div>
          </div>
        </div>
        <WeekForecast selectedTempType={selectedTempType} city={city} />
      </div>
    );
  },
);
