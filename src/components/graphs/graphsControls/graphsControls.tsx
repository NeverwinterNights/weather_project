import React from 'react';

import { useDispatch } from 'react-redux';

import { changeGraphsTypeAC } from '../../../state/appReducer';

import style from './GraphsControls.module.scss';

export const GraphsControls = React.memo(() => {
  const dispatch = useDispatch();

  const tempOnClickHandler = (): void => {
    dispatch(changeGraphsTypeAC('temperature'));
  };

  const humidityOnClickHandler = (): void => {
    dispatch(changeGraphsTypeAC('humidity'));
  };

  const pressureOnClickHandler = (): void => {
    dispatch(changeGraphsTypeAC('pressure'));
  };

  return (
    <div className={style.main}>
      <button onClick={tempOnClickHandler} type="button">
        Temperature
      </button>
      <button onClick={humidityOnClickHandler} type="button">
        Humidity
      </button>
      <button onClick={pressureOnClickHandler} type="button">
        Pressure
      </button>
    </div>
  );
});
