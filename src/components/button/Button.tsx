import React from 'react';

import { TypeSearchTypes } from '../../types/types';

import style from './Button.module.scss';

type ButtonPropsType = {
  onClickHandler: (type: TypeSearchTypes) => void;
  label: string;
  value: TypeSearchTypes;
  clicked: TypeSearchTypes;
};

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
