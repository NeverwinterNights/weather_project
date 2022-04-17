import React, { useState } from 'react';

import { Controls } from '../controls/Controls';
import { Menu } from '../menu/Menu';

import style from './Header.module.scss';

type HeaderPropsType = {
  themeHandler: (value: boolean) => void;
};

export const Header = React.memo(({ themeHandler }: HeaderPropsType) => {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const onClickGearHandler = (): void => {
    setMenuActive(!menuActive);
  };

  return (
    <div className={style.main}>
      <Menu themeHandler={themeHandler} open={menuActive} />
      <div className={style.wrapper}>
        <div className={style.search}>
          {/* <Input typeSearch={searchTypeValue} onClickInputSearch={onClickInputSearch} /> */}
        </div>
        <Controls />
        <div className={style.controls}>
          <button
            onClick={onClickGearHandler}
            type="button"
            aria-label=" "
            className={style.icon}
            style={menuActive ? { transform: 'rotate(180deg)', color: '#c9c23f' } : {}}
          />
          {/* <img className={style.icon} src={gear} alt="" /> */}
        </div>
      </div>
    </div>
  );
});
