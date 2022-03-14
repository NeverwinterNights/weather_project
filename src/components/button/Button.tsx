import React from 'react';

import { typeSearchTypes } from '../../types/types';

type ButtonPropsType = {
  onClickHandler: (type: typeSearchTypes) => void;
  label: string;
  value: typeSearchTypes;
};

export const Button = React.memo(({ onClickHandler, label, value }: ButtonPropsType) => (
  <button type="button" onClick={() => onClickHandler(value)}>
    {label}
  </button>
));
