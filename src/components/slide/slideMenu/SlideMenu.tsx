import React from 'react';

import { useSelector } from 'react-redux';

import { AppRootStateType } from '../../../state/store';
import { Favorites } from '../../favorites/Favorites';
import { MenuTheme } from '../../menuTheme/MenuTheme';

import style from './SlideMenu.module.scss';
import { SlideMenuPropsType } from './types';

export const SlideMenu = React.memo(
  ({ open, setThemeMenuActive }: SlideMenuPropsType) => {
    const favorite = useSelector<AppRootStateType, boolean>(
      state => state.appReducer.favorite,
    );

    return (
      <div className={style.wrapper}>
        {favorite && <Favorites setThemeMenuActive={setThemeMenuActive} />}
        {open && <MenuTheme />}
      </div>
    );
  },
);
