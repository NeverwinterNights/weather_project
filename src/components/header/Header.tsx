import React from 'react';

import { useDispatch } from 'react-redux';

import { changeFavoritesAC, changeSlideOpenAC } from '../../state/appReducer';
import { HeaderControls } from '../controls/headerControls/HeaderControls';
import { Star } from '../icon/star/Star';

import style from './Header.module.scss';
import { HeaderPropsType } from './types';

export const Header = React.memo(
  ({ menuActive, onClickGearHandler }: HeaderPropsType) => {
    const dispatch = useDispatch();

    const onClickFavoriteHandler = (fav: boolean): void => {
      dispatch(changeFavoritesAC(fav));
      dispatch(changeSlideOpenAC(true));
    };

    return (
      <div className={style.main}>
        <div className={style.wrapper}>
          <div className={style.info}>
            <HeaderControls />
          </div>
          <div className={style.controls}>
            <Star onClickFavoriteHandler={onClickFavoriteHandler} />
            <button
              onClick={onClickGearHandler}
              type="button"
              aria-label=" "
              className={style.icon}
              style={menuActive ? { transform: 'rotate(180deg)', color: '#c9c23f' } : {}}
            />
          </div>
        </div>
      </div>
    );
  },
);
