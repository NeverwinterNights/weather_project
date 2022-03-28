import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setTypeOfTemperatureAC } from '../../state/appReducer';
import { AppRootStateType } from '../../state/store';
import { dayNightAC } from '../../state/themeReducer';
import { Toggle } from '../toggle/Toggle';

import style from './Menu.module.scss';

type MenuPropsType = {
  open: boolean;
};

export const Menu = React.memo(({ open }: MenuPropsType) => {
  const theme = useSelector<AppRootStateType, boolean>(state => state.theme.dayNight);
  const temperatureType = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.temperatureType,
  );
  const dispatch = useDispatch();

  const themeHandler = (): void => {
    dispatch(dayNightAC(!theme));
  };

  const temperatureTypeChanger = (): void => {
    dispatch(setTypeOfTemperatureAC(!temperatureType));
  };

  const styles = open ? { left: '0px' } : { left: '-44%' };
  const styles2 = theme ? { backgroundColor: '#323675' } : { backgroundColor: '#4fbb65' };
  const common = { ...styles, ...styles2 };

  return (
    <div className={style.wrapper} style={common}>
      <div className={style.item}>
        <div className={style.text}>Theme</div>
        <Toggle themeHandler={themeHandler} />
      </div>
      <div className={style.item}>
        <div className={style.text}>Temperature</div>
        <Toggle temperatureTypeChanger={temperatureTypeChanger} />
      </div>
    </div>
  );
});
// {
//   open ? { left: '0px' } : { left: '-37%' };
// }
// theme ? { backgroundColor: 'white' } : { backgroundColor: '#4fbb65' };
//  style={`${open ? "left: '0px'" : "left: '-37px'"}`}
