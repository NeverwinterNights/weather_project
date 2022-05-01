import React, { useState } from 'react';

import style from './Handle.module.scss';

type HandlePropsType = {
  viewModeHandler: (value: string) => void;
};

type ButtonType = 'card' | 'graphs' | 'map';

export const Handle = React.memo(({ viewModeHandler }: HandlePropsType) => {
  const [clicked, setClicked] = useState<ButtonType>('card');

  const onClickHandler = (value: ButtonType): void => {
    setClicked(value);
    viewModeHandler(value);
  };

  return (
    <div className={style.main}>
      <button
        style={clicked === 'card' ? { backgroundColor: '#637479', color: '#ffd0a6' } : {}}
        className={style.button}
        value="card"
        onClick={() => onClickHandler('card')}
        type="button"
      >
        Card
      </button>
      <button
        style={
          clicked === 'graphs' ? { backgroundColor: '#637479', color: '#ffd0a6' } : {}
        }
        className={style.button}
        value="graphs"
        onClick={() => onClickHandler('graphs')}
        type="button"
      >
        Graphs
      </button>
      <button
        style={clicked === 'map' ? { backgroundColor: '#637479', color: '#ffd0a6' } : {}}
        className={style.button}
        value="map"
        onClick={() => onClickHandler('map')}
        type="button"
      >
        Map
      </button>
    </div>
  );
});
