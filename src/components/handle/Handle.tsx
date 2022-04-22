import React from 'react';

import { useDispatch } from 'react-redux';

import { setGraphsAC, ViewModeType } from '../../state/appReducer';

import style from './Handle.module.scss';

type HandlePropsType = {
  // eslint-disable-next-line react/require-default-props
  getID?: () => void;
};

export const Handle = React.memo(({ getID }: HandlePropsType) => {
  const dispatch = useDispatch();
  const onClickHandler = (viewMode: ViewModeType): void => {
    dispatch(setGraphsAC(viewMode));
  };
  const onClickMapHandler = (viewMode: ViewModeType): void => {
    dispatch(setGraphsAC(viewMode));
    if (getID) {
      getID();
    }
  };

  return (
    <div className={style.main}>
      <button value="card" onClick={() => onClickHandler('card')} type="button">
        Card
      </button>
      <button value="graphs" onClick={() => onClickHandler('graphs')} type="button">
        Graphs
      </button>
      <button value="map" onClick={() => onClickMapHandler('map')} type="button">
        Map
      </button>
    </div>
  );
});
