import React from 'react';

import style from './Icon.module.scss';

type IconPropsType = {
  name: string | undefined;
};

export const Icon = React.memo(({ name }: IconPropsType) => (
  <div className={style.wrapper}>
    {name && (
      <img
        src={`http://openweathermap.org/img/wn/${name}@4x.png`}
        alt=""
        className={style.image}
      />
    )}
  </div>
));
