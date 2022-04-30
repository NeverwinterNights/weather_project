import React, { useState } from 'react';

import { TypeSearchTypes } from '../../types/types';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { headerButton } from '../utils/constans';

import style from './Controls.module.scss';

export const Controls = React.memo(() => {
  const [searchTypeValue, setSearchTypeValue] = useState<TypeSearchTypes>('city');
  const [clicked, setClicked] = useState<TypeSearchTypes>('city');
  const onClickSearch = (type: TypeSearchTypes): void => {
    setSearchTypeValue(type);
    setClicked(type);
  };
  return (
    <div className={style.main}>
      <div className={style.buttons}>
        {headerButton.map(button => (
          <Button
            clicked={clicked}
            key={button.value}
            onClickHandler={onClickSearch}
            value={button.value}
            label={button.name}
          />
        ))}
      </div>
      <Input typeSearch={searchTypeValue} />
    </div>
  );
});
