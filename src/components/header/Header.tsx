import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setGraphsAC } from '../../state/appReducer';
import { AppRootStateType } from '../../state/store';
// import { TypeSearchTypes } from '../../types/types';
// import { Button } from '../button/Button';
// import { Input } from '../input/Input';
import { Controls } from '../controls/Controls';
import { Menu } from '../menu/Menu';
// import { headerButton } from '../utils/constans';

import style from './Header.module.scss';

export const Header = React.memo(() => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const dispatch = useDispatch();

  const graphs = useSelector<AppRootStateType, boolean>(state => state.appReducer.graphs);

  const onClickGearHandler = (): void => {
    setMenuActive(!menuActive);
  };

  const onClickGraphsHandler = (): void => {
    dispatch(setGraphsAC(!graphs));
  };

  return (
    <div className={style.main}>
      <Menu open={menuActive} />
      <div className={style.wrapper}>
        <div className={style.search}>
          {/* <Input typeSearch={searchTypeValue} onClickInputSearch={onClickInputSearch} /> */}
        </div>
        {!graphs && <Controls />}
        <div className={style.controls}>
          <button
            onClick={onClickGearHandler}
            type="button"
            aria-label=" "
            className={style.icon}
            style={menuActive ? { transform: 'rotate(180deg)', color: '#c9c23f' } : {}}
          />
          <button onClick={onClickGraphsHandler} type="button">
            Graphs
          </button>
        </div>
      </div>
    </div>
  );
});
