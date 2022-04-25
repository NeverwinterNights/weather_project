import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { changeFavoritesAC } from '../../../state/appReducer';
import { setLocationCitiesAC } from '../../../state/citiesReducer';
import { DataWeatherType, getDataByCityNameTC } from '../../../state/dataReducer';
import { deleteCityFromFavoritesAC } from '../../../state/favoritesReducer';
import { AppRootStateType } from '../../../state/store';
import { conditionUtils } from '../../../utils/utils';

import style from './FavMenu.module.scss';
import { Closed } from './icons/Closed';
import { CloseMenu } from './icons/CloseMenu';

export const FavMenu = React.memo(() => {
  const favoritesCity = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.favoritesReducer,
  );
  const data = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.dataReducer,
  );
  const favorite = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.favorite,
  );
  const dispatch = useDispatch();

  const closedFavoritesHandler = (value: boolean): void => {
    dispatch(changeFavoritesAC(value));
  };

  return (
    <div
      style={!favorite ? { transform: 'translate(-650px,0px)' } : {}}
      className={style.wrapper}
    >
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
    </div>
  );
});
