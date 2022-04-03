import React, { useMemo } from 'react';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useDispatch, useSelector } from 'react-redux';

import moon from '../../images/moon.svg';
import sun from '../../images/sun.svg';
import { DataWeatherType, deleteCityAC } from '../../state/dataReducer';
import { addCityAC } from '../../state/favoritesReducer';
import { AppRootStateType } from '../../state/store';
import { changeTemp } from '../../utils/utils';
import { Icon } from '../icon/Icon';
import { CURRENT_TIME } from '../utils/constans';

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

  const selectedTempType = tempType ? '\u00B0C' : '\u00B0F';

  const CardTemp = useMemo(
    () => ({
      current: changeTemp(tempType, Math.round(city.current.temp)),
      min: changeTemp(tempType, Math.round(city.daily[0]?.temp.min)),
      max: changeTemp(tempType, Math.round(city.daily[0]?.temp.max)),
      feels: changeTemp(tempType, Math.round(city.mainData?.feels_like)),
      day: changeTemp(tempType, Math.round(city.daily[0]?.temp.day)),
      night: changeTemp(tempType, Math.round(city.daily[0]?.temp.night)),
      humidity: city.current?.humidity,
      pressure: city.current?.pressure,
      wind: Math.round(city.current?.wind_speed),
    }),
    [city.current, city.mainData, city.daily, tempType],
  );

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <button
          className={style.add}
          onClick={onAddToFavoritesHandler}
          aria-label=" "
          type="button"
          title="Add to Favorites"
        />
        <button
          className={style.delete}
          onClick={onClosedHandler}
          aria-label=" "
          type="button"
          title="Close"
        />
      </div>
      <div className={style.up}>
        <div className={style.city}>{city.cityName}</div>
        <div className={style.time}>
          {city.timezone && dayjs().tz(city.timezone).format(CURRENT_TIME)}
        </div>
      </div>
      <div className={style.main}>
        <div className={style.info}>
          {Object.keys(city.current).length && city.current.weather[0] ? (
            <Icon name={city.current.weather[0].icon} size={4} />
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
      <div className={style.footer}>
        {city.daily.map(day => (
          <div key={day.dt} className={style.elem}>
            <div className={style.row}>{`${dayjs.unix(day.dt).format('MMMM D')}`}</div>
            <div className={style.row}>{`${dayjs.unix(day.dt).format('dddd')}`}</div>
            <div className={style.row}>
              <img src={sun} alt="day" /> {`${CardTemp.max} ${selectedTempType}`}
            </div>
            <div className={style.row}>
              <img src={moon} alt="night" /> {`${CardTemp.min} ${selectedTempType}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
