import React from 'react';

import { nameToUppercase } from '../../../utils/utils';
import style from '../cardMapGraphsControls/CardMapGraphsControls.module.scss';

import { ButtonHandlePropsType } from './types';

export const ButtonControls = React.memo(
  ({ value, onClickHandler, checked }: ButtonHandlePropsType) => (
    <button
      style={checked ? { backgroundColor: '#637479', color: '#ffd0a6' } : {}}
      className={style.button}
      onClick={onClickHandler}
      type="button"
    >
      {nameToUppercase(value)}
    </button>
  ),
);
