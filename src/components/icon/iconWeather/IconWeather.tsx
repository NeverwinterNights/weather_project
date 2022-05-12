import React from 'react';

import style from './IconWeather.module.scss';
import { IconPropsType } from './types';

export const IconWeather = React.memo(({ name, size }: IconPropsType) => (
  <div className={style.wrapper}>
    {name && (
      <img
        src={`http://openweathermap.org/img/wn/${name}@${size}x.png`}
        alt=""
        className={style.image}
      />
    )}
  </div>
));
