import React, { useState } from 'react';

import { TypeSearchTypes } from '../../types/types';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { Menu } from '../menu/Menu';
import { headerButton } from '../utils/constans';

import style from './Header.module.scss';

export const Header = React.memo(() => {
  // const [searchData, setSearchData] = useState<string | number>('');
  const [searchTypeValue, setSearchTypeValue] = useState<TypeSearchTypes>('city');
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const onClickSearch = (type: TypeSearchTypes): void => {
    setSearchTypeValue(type);
  };
  // const onClickInputSearch = (value: string): void => {
  //   setSearchData(value);
  // };
  const onClickGearHandler = (): void => {
    setMenuActive(!menuActive);
  };

  // useEffect(() => {
  //   console.log(searchData);
  // }, [searchData]);

  return (
    <div className={style.main}>
      <Menu open={menuActive} />
      <div className={style.wrapper}>
        <div className={style.search}>
          {headerButton.map(button => (
            <Button
              key={button.value}
              onClickHandler={onClickSearch}
              value={button.value}
              label={button.name}
            />
          ))}
          {/* <Input typeSearch={searchTypeValue} onClickInputSearch={onClickInputSearch} /> */}
          <Input typeSearch={searchTypeValue} />
        </div>

        <div className={style.controls}>
          <button
            onClick={onClickGearHandler}
            type="button"
            aria-label=" "
            className={style.icon}
            style={menuActive ? { transform: 'rotate(180deg)', color: '#c9c23f' } : {}}
          />
        </div>
      </div>
    </div>
  );
});
