import React from 'react';

import { Overlay } from '../overlay/Overlay';

import { FavMenu } from './FavMenu/FavMenu';
import style from './Favorites.module.scss';

export const Favorites = React.memo(() => (
  <div className={style.main}>
    <Overlay />
    <FavMenu />

    {/* {favoritesCity && favoritesCity.map(city => <FavCard key={city.id} city={city} />)} */}
  </div>
));
