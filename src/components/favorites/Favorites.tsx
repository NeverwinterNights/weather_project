import React from 'react';

import { useSelector } from 'react-redux';

import { DataWeatherType } from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';

import { FavCard } from './favCard/FavCard';
import style from './Favorites.module.scss';

export const Favorites = React.memo(() => {
  const favoritesCity = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.favoritesReducer,
  );

  return (
    <div className={style.main}>
      {favoritesCity && favoritesCity.map(city => <FavCard key={city.id} city={city} />)}
    </div>
  );
});
