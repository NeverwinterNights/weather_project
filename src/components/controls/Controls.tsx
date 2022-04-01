import React, { useState } from 'react';

import { TypeSearchTypes } from '../../types/types';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { headerButton } from '../utils/constans';

import style from './Controls.module.scss';

export const Controls = React.memo(() => {
  const [searchTypeValue, setSearchTypeValue] = useState<TypeSearchTypes>('city');

  const onClickSearch = (type: TypeSearchTypes): void => {
    setSearchTypeValue(type);
  };
  return (
    <div className={style.main}>
      {headerButton.map(button => (
        <Button
          key={button.value}
          onClickHandler={onClickSearch}
          value={button.value}
          label={button.name}
        />
      ))}
      <Input typeSearch={searchTypeValue} />
    </div>
  );
});
