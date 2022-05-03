import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { changeFavoritesAC, changeSlideOpenAC } from '../../../state/appReducer';
import { setLocationCitiesAC } from '../../../state/citiesReducer';
import { DataWeatherType, getDataByCityNameTC } from '../../../state/dataReducer';
import { deleteCityFromFavoritesAC } from '../../../state/favoritesReducer';
import { AppRootStateType } from '../../../state/store';
import { conditionUtils } from '../../../utils/utils';
import { Closed } from '../slideMenu/icons/Closed';
import { CloseMenu } from '../slideMenu/icons/CloseMenu';
import style from '../slideMenu/SlideMenu.module.scss';

export const Favorites = React.memo(() => {
  const dispatch = useDispatch();
  const favoritesCity = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.favoritesReducer,
  );
  const data = useSelector<AppRootStateType, DataWeatherType[]>(
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
            if (conditionUtils(data, cityName, countryID)) {
              dispatch(setLocationCitiesAC([]));
            } else {
              dispatch(getDataByCityNameTC(cityName, lat, lon, countryID));
              dispatch(changeFavoritesAC(!favorite));
            }
          };
          return (
            <div key={city.id} className={style.row}>
              <div
                onKeyPress={() => {
                  clickSelectLocationHandler(
                    city.cityName,
                    city.lat,
                    city.lon,
                    city.country,
                  );
                }}
                role="button"
                tabIndex={0}
                onClick={() => {
                  clickSelectLocationHandler(
                    city.cityName,
                    city.lat,
                    city.lon,
                    city.country,
                  );
                }}
                className={style.info}
              >
                <div className={style.name}>{`${city.cityName},`}</div>
                <div className={style.country}>{city.country}</div>
              </div>
              <Closed onDeleteToFavoritesHandler={onDeleteToFavoritesHandler} />
            </div>
          );
        })}
      </div>
    </div>
  );
});
