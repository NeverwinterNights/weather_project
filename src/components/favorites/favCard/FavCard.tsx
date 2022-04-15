import React, { useEffect, useMemo } from 'react';

import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import humidity from '../../../images/humidity.svg';
import temperature from '../../../images/temperature.svg';
import wind from '../../../images/wind.svg';
import {
  deleteCityFromFavoritesAC,
  updateFavoritesTC,
  // updateFavoritesTC,
} from '../../../state/favoritesReducer';
import { AppRootStateType } from '../../../state/store';
import { DataWeatherType } from '../../../types/types';
import { changeTemp } from '../../../utils/utils';
import { Icon } from '../../icon/Icon';
import { CURRENT_TIME } from '../../utils/constans';
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

  const favoriteData = useMemo(
    () => ({
      current: changeTemp(tempType, Math.round(city.current.temp)),
      humidity: city.current.humidity,
      wind: Math.round(city.current.wind_speed),
    }),
    [city.current, tempType],
  );

  const favoriteTempType = tempType ? '\u00B0C' : '\u00B0F';

  return (
    <div key={city.id} className={style.card}>
      <div className={style.body}>
        <button
          className={style.delete}
          onClick={onDeleteToFavoritesHandler}
          aria-label=" "
          type="button"
          title="Delete from favorites"
        />
        <div className={style.icon}>
          <Icon name={city.current.weather[0].icon} size={2} />
        </div>
        <div className={style.name}>{city.cityName} </div>
        <div className={style.date}>{dayjs().tz(city.timezone).format(CURRENT_TIME)}</div>
        <div className={style.info}>
          <div className={style.item}>
            <img className={style.img} src={temperature} alt="" />
            {`- ${favoriteData.current} ${favoriteTempType}`}
          </div>
          <div className={style.item}>
            <img className={`${style.img} ${style.hum}`} src={humidity} alt="" />
            {`- ${favoriteData.humidity} %`}
          </div>
          <div className={style.item}>
            <img className={style.img} src={wind} alt="" />
            {`- ${favoriteData.wind} m/s`}
          </div>
        </div>
      </div>
    </div>
  );
});
