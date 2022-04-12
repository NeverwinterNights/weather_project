import React from 'react';

import { useDispatch } from 'react-redux';

import { setGraphsAC, ViewModeType } from '../../state/appReducer';

import style from './Handle.module.scss';

export const Handle = React.memo(() => {
  const dispatch = useDispatch();
  const onClickHandler = (viewMode: ViewModeType): void => {
    dispatch(setGraphsAC(viewMode));
  };
  return (
    <div className={style.main}>
      <button value="card" onClick={() => onClickHandler('card')} type="button">
        Card
      </button>
      <button value="graphs" onClick={() => onClickHandler('graphs')} type="button">
        Graphs
      </button>
      <button value="map" onClick={() => onClickHandler('map')} type="button">
        Map
      </button>
    </div>
  );
});
