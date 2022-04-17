import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

// import schema from '../../../theme/schema';
import useTheme from '../../hooks/useTheme.hooks';
import { setTypeOfTemperatureAC } from '../../state/appReducer';
import { AppRootStateType } from '../../state/store';
import { Toggle } from '../toggle/Toggle';

import style from './Menu.module.scss';

type MenuPropsType = {
  open: boolean;
  themeHandler: (value: boolean) => void;
};

export const Menu = React.memo(({ open, themeHandler }: MenuPropsType) => {
  const theme = useSelector<AppRootStateType, boolean>(state => state.theme.dayNight);
  const temperatureType = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.temperatureType,
  );
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTheme, setCurrentTheme] = useTheme();
  // const themeHandler = (): void => {
  //   dispatch(dayNightAC(!theme));
  // };

  // const themeHandler = (value: boolean): void => {
  //   if (value) {
  //     setCurrentTheme(schema.data.Light);
  //   } else {
  //     setCurrentTheme(schema.data['Sea Wave']);
  //   }
  // };

  const temperatureTypeChanger = (): void => {
    dispatch(setTypeOfTemperatureAC(!temperatureType));
  };

  const styles = open ? { left: '0px' } : { left: '-44%' };
  const styles2 = theme ? { backgroundColor: '#323675' } : { backgroundColor: '#4fbb65' };
  const common = { ...styles, ...styles2 };

  return (
    <div className={style.wrapper} style={common}>
      <div className={style.item}>
        <div className={style.text}>Light</div>
        <Toggle themeHandler={themeHandler} />
        <div className={style.text}>Dark</div>
      </div>
      <div className={style.item}>
        <div className={style.text}>Celsius</div>
        <Toggle temperatureTypeChanger={temperatureTypeChanger} />
        <div className={style.text}>Fahrenheit</div>
      </div>
    </div>
  );
});
