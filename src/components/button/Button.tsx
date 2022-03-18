import React from 'react';

import { TypeSearchTypes } from '../../types/types';

type ButtonPropsType = {
  onClickHandler: (type: TypeSearchTypes) => void;
  label: string;
  value: TypeSearchTypes;
};

export const Button = React.memo(({ onClickHandler, label, value }: ButtonPropsType) => (
  <button type="button" onClick={() => onClickHandler(value)}>
    {label}
  </button>
));
