import React from 'react';

import { Handle } from '../handle/Handle';

import style from './Map.module.scss';

export const Map = React.memo(() => {
  console.log('object');
  return (
    <div className={style.main}>
      ааа
      <div className={style.controls}>
        <Handle />
      </div>
    </div>
  );
});
