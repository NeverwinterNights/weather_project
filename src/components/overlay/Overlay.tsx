import React, { CSSProperties, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { changeFavoritesAC } from '../../state/appReducer';
import { AppRootStateType } from '../../state/store';

export const Overlay = React.memo(() => {
  const [activeCover, setCoverActive] = useState<boolean>(true);
  const dispatch = useDispatch();
  const favorite = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.favorite,
  );

  const activeStyle: CSSProperties = {
    position: 'absolute',
    top: '-66px',
    left: '0',
    width: '100%',
    height: '100vw',
    backgroundColor: 'black',
    opacity: '0.3',
  };
  const defaultStyle: CSSProperties = {
    display: 'none',
  };
  const setCoverActiveHandler = (): void => {
    setCoverActive(false);
    dispatch(changeFavoritesAC(false));
  };

  useEffect(() => {
    setCoverActive(favorite);
  }, [favorite]);

  return (
    <div
      tabIndex={0}
      aria-label=" "
      onKeyPress={setCoverActiveHandler}
      role="button"
      onClick={setCoverActiveHandler}
      style={activeCover ? activeStyle : defaultStyle}
    />
  );
});
