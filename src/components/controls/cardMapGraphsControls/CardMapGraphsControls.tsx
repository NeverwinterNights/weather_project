import React, { useState } from 'react';

import { ButtonControls } from '../buttonControls/ButtonControls';

import style from './CardMapGraphsControls.module.scss';
import { ButtonType, HandlePropsType } from './types';

export const CardMapGraphsControls = React.memo(
  ({ viewModeHandler }: HandlePropsType) => {
    const [clickedType, setClickedType] = useState<ButtonType>('card');

    const onClickHandler = (value: ButtonType): void => {
      setClickedType(value);
      viewModeHandler(value);
    };

    return (
      <div className={style.main}>
        <ButtonControls
          onClickHandler={() => {
            onClickHandler('card');
          }}
          checked={clickedType === 'card'}
          value="card"
        />
        <ButtonControls
          onClickHandler={() => {
            onClickHandler('graphs');
          }}
          checked={clickedType === 'graphs'}
          value="graphs"
        />
        <ButtonControls
          onClickHandler={() => {
            onClickHandler('map');
          }}
          checked={clickedType === 'map'}
          value="map"
        />
      </div>
    );
  },
);
