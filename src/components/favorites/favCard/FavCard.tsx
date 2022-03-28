import React, { useEffect } from 'react';

import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import humidity from '../../../image/humidity.svg';
import temperature from '../../../image/temperature.svg';
import wind from '../../../image/wind.svg';
import {
  deleteCityFromFavoritesAC,
  updateFavoritesTC,
  // updateFavoritesTC,
} from '../../../state/favoritesReducer';
import { AppRootStateType } from '../../../state/store';
import { DataWeatherType } from '../../../types/types';
import { changeTemp } from '../../../utils/utils';
import { Icon } from '../../icon/Icon';
import style from '../Favorites.module.scss';

type FavCardPropsType = {
  city: DataWeatherType;
};

export const FavCard = React.memo(({ city }: FavCardPropsType) => {
  const favoritesCity = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.favoritesReducer,
  );
  const tempType = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.temperatureType,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateFavoritesTC(city.lat, city.lon, city.id));
    const fav = setInterval(() => {
      dispatch(updateFavoritesTC(city.lat, city.lon, city.id));
    }, 600000);
    return () => {
      clearInterval(fav);
    };
  }, []);

  const onDeleteToFavoritesHandler = (): void => {
    dispatch(deleteCityFromFavoritesAC(city.id));
    const newFav = favoritesCity.filter(town => town.id !== city.id);
    localStorage.setItem('state', JSON.stringify(newFav));
  };

  return (
    <div key={city.id} className={style.card}>
      <div className={style.body}>
        <button onClick={onDeleteToFavoritesHandler} type="button">
          delete from fav
        </button>
        <div className={style.icon}>
          <Icon name={city.current.weather[0].icon} size={2} />
        </div>
        <div className={style.name}>{city.cityName} </div>
        <div className={style.date}>
          {dayjs().tz(city.timezone).format('MMMM D, h:mm A')}
        </div>
        <div className={style.info}>
          <div className={style.item}>
            <img className={style.img} src={temperature} alt="" /> -{' '}
            {changeTemp(tempType, Math.round(city.current.temp))}
            {tempType ? <span> &deg;C</span> : <span>&deg;F</span>}
          </div>
          <div className={style.item}>
            <img className={`${style.img} ${style.hum}`} src={humidity} alt="" /> -{' '}
            {city.current.humidity} %
          </div>
          <div className={style.item}>
            <img className={style.img} src={wind} alt="" /> -{' '}
            {Math.round(city.current.wind_speed)} m/s
          </div>
        </div>
      </div>
    </div>
  );
});
