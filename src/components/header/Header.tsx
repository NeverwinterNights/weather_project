import React, { useState } from 'react';

import { Controls } from '../controls/Controls';
import { Menu } from '../menu/Menu';

import style from './Header.module.scss';

export const Header = React.memo(() => {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const onClickGearHandler = (): void => {
    setMenuActive(!menuActive);
  };

  return (
    <div className={style.main}>
      <Menu open={menuActive} />
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
        </div>
      </div>
    </div>
  );
});
