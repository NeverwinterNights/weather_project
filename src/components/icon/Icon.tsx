import React from 'react';

import style from './Icon.module.scss';

type IconPropsType = {
  name: string | undefined;
  size: number;
};

export const Icon = React.memo(({ name, size }: IconPropsType) => (
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
