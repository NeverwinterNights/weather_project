import React, { useState } from 'react';

import { Button } from '../../ shared/button/Button';
import { TypeSearchTypes } from '../../../types/types';
import { Input } from '../../input/Input';
import { headerButton } from '../../utils/constans';

import style from './HeaderControls.module.scss';

export const HeaderControls = React.memo(() => {
  const [searchTypeValue, setSearchTypeValue] = useState<TypeSearchTypes>('city');
  const [clickedButtonType, setClickedButtonType] = useState<TypeSearchTypes>('city');
  const onClickSearch = (type: TypeSearchTypes): void => {
    setSearchTypeValue(type);
    setClickedButtonType(type);
  };
  return (
    <div className={style.main}>
      <div className={style.buttons}>
        {headerButton.map(button => (
          <Button
            clicked={clickedButtonType}
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
