import React from 'react';

import { useSelector } from 'react-redux';

import { AppRootStateType } from '../../../state/store';
import { MenuTheme } from '../../menuTheme/MenuTheme';
import { Favorites } from '../favorites/Favorites';

import style from './SlideMenu.module.scss';

type SlideMenuPropsType = {
  open: boolean;
};

export const SlideMenu = React.memo(({ open }: SlideMenuPropsType) => {
  const favorite = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.favorite,
  );
  // const slideOpen = useSelector<AppRootStateType, boolean>(
  //   state => state.appReducer.slideOpen,
  // );

  return (
    <div
      // style={!slideOpen ? { transform: 'translate(-650px,0px)' } : {}}
      className={style.wrapper}
    >
      {favorite && <Favorites />}
      {open && <MenuTheme />}
    </div>
  );
});
