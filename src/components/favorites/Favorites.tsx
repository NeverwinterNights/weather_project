import React, { KeyboardEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { changeFavoritesAC, changeSlideOpenAC } from '../../state/appReducer';
import { setLocationCitiesAC } from '../../state/citiesReducer';
import { DataWeatherType, getDataByCityNameTC } from '../../state/dataReducer';
import { deleteCityFromFavoritesAC } from '../../state/favoritesReducer';
import { AppRootStateType } from '../../state/store';
import { conditionUtils } from '../../utils/utils';
import { DeleteFromFavorites } from '../icon/deleteFromFavorites/DeleteFromFavorites';
import { CloseMenu } from '../icon/сloseMenu/CloseMenu';
import style from '../slide/slideMenu/SlideMenu.module.scss';

import { FavoritesPropsType } from './types';

export const Favorites = React.memo(({ setThemeMenuActive }: FavoritesPropsType) => {
  const dispatch = useDispatch();
  const favoritesCity = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.favoritesReducer,
  );
  const weatherData = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.dataReducer,
  );
  const favorite = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.favorite,
  );

  const closedFavoritesHandler = (value: boolean): void => {
    dispatch(changeFavoritesAC(value));
    dispatch(changeSlideOpenAC(false));
  };

  return (
    <div className={style.body}>
      <div className={style.header}>
        <div className={style.title}>Favorite city </div>
        <CloseMenu closedFavoritesHandler={closedFavoritesHandler} />
      </div>
      <div className={style.main}>
        {favoritesCity.map(city => {
          const onDeleteToFavoritesHandler = (): void => {
            dispatch(deleteCityFromFavoritesAC(city.id));
            const newFav = favoritesCity.filter(town => town.id !== city.id);
            localStorage.setItem('state', JSON.stringify(newFav));
          };
          const clickSelectLocationHandler = (
            cityName: string,
            lat: number,
            lon: number,
            countryID: string | undefined,
          ): void => {
            if (conditionUtils(weatherData, cityName, countryID)) {
              dispatch(setLocationCitiesAC([]));
            } else {
              dispatch(getDataByCityNameTC(cityName, lat, lon, countryID));
              setThemeMenuActive(false);
              dispatch(changeFavoritesAC(false));
              dispatch(changeSlideOpenAC(false));
              setTimeout(() => {
                dispatch(changeFavoritesAC(!favorite));
              }, 1000);
            }
          };
          const onClickSendRequest = (): void => {
            clickSelectLocationHandler(city.cityName, city.lat, city.lon, city.country);
          };
          const onPressSendRequest = (e: KeyboardEvent<HTMLInputElement>): void => {
            if (e.key === 'Enter') {
              clickSelectLocationHandler(city.cityName, city.lat, city.lon, city.country);
            }
          };

          return (
            <div key={city.id} className={style.row}>
              <div
                onKeyPress={onPressSendRequest}
                role="button"
                tabIndex={0}
                onClick={onClickSendRequest}
                className={style.info}
              >
                <div className={style.name}>{`${city.cityName},`}</div>
                <div className={style.country}>{city.country}</div>
              </div>
              <DeleteFromFavorites
                onDeleteToFavoritesHandler={onDeleteToFavoritesHandler}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});
