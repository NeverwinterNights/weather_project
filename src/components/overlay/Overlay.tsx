import React, { CSSProperties, KeyboardEvent } from 'react';

import { useDispatch } from 'react-redux';

import { changeFavoritesAC, changeSlideOpenAC } from '../../state/appReducer';

import { OverlayPropsType } from './types';

export const Overlay = React.memo(({ setThemeMenuActive }: OverlayPropsType) => {
  const dispatch = useDispatch();

  const activeStyle: CSSProperties = {
    position: 'absolute',
    top: '-93px',
    left: '11px',
    width: '100%',
    height: '100vw',
    backgroundColor: 'black',
    opacity: '0.3',
  };

  const setCoverActiveHandler = (): void => {
    setThemeMenuActive(false);
    dispatch(changeFavoritesAC(false));
    dispatch(changeSlideOpenAC(false));
  };

  const setCoverActiveKeyHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setCoverActiveHandler();
    }
  };

  return (
    <div
      tabIndex={0}
      aria-label=" "
      onKeyPress={setCoverActiveKeyHandler}
      role="button"
      onClick={setCoverActiveHandler}
      style={activeStyle}
    />
  );
});
