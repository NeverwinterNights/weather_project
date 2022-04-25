import React from 'react';

import style from './Handle.module.scss';

type HandlePropsType = {
  viewModeHandler: (value: string) => void;
};

export const Handle = React.memo(({ viewModeHandler }: HandlePropsType) => (
  <div className={style.main}>
    <button value="card" onClick={() => viewModeHandler('card')} type="button">
      Card
    </button>
    <button value="graphs" onClick={() => viewModeHandler('graphs')} type="button">
      Graphs
    </button>
    <button value="map" onClick={() => viewModeHandler('map')} type="button">
      Map
    </button>
  </div>
));
