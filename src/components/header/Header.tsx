import React from 'react';

import { useDispatch } from 'react-redux';

// import { ReactComponent as Star } from '../../images/star.svg';
import { changeFavoritesAC } from '../../state/appReducer';
import { Controls } from '../controls/Controls';

import style from './Header.module.scss';
import { Star } from './icons/Star';

type HeaderPropsType = {
  menuActive: boolean;
  onClickGearHandler: () => void;
};

export const Header = React.memo(
  ({ menuActive, onClickGearHandler }: HeaderPropsType) => {
    const dispatch = useDispatch();

    const onClickFavoriteHandler = (fav: boolean): void => {
      dispatch(changeFavoritesAC(fav));
    };

    return (
      <div className={style.main}>
        <div className={style.wrapper}>
          <div className={style.search} />
          <Controls />
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
