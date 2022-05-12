import React from 'react';

import style from './Button.module.scss';
import { ButtonPropsType } from './types';

export const Button = React.memo(
  ({ onClickHandler, label, value, clicked }: ButtonPropsType) => {
    const onClickHandle = (): void => {
      onClickHandler(value);
    };

    return (
      <button
        style={clicked === value ? { backgroundColor: '#637479', color: '#ffd0a6' } : {}}
        className={style.button}
        type="button"
        onClick={onClickHandle}
      >
        {label}
      </button>
    );
  },
);
