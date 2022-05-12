import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import schema from '../../../theme/schema';
import useTheme from '../../hooks/useTheme.hooks';
import { setTypeOfTemperatureAC } from '../../state/appReducer';
import { AppRootStateType } from '../../state/store';
import { ToggleTheme } from '../toggleTheme/ToggleTheme';

import style from './MenuTheme.module.scss';

export const MenuTheme = React.memo(() => {
  const temperatureType = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.temperatureType,
  );
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTheme, setCurrentTheme] = useTheme();
  const themeHandler = (value: boolean): void => {
    if (value) {
      setCurrentTheme(schema.data.Light);
    } else {
      setCurrentTheme(schema.data['Sea Wave']);
    }
  };

  const temperatureTypeChanger = (): void => {
    dispatch(setTypeOfTemperatureAC(!temperatureType));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.body}>
        <div className={style.item}>
          <div className={style.text}>Light</div>
          <ToggleTheme themeHandler={themeHandler} />
          <div className={style.text}>Dark</div>
        </div>
        <div className={style.item}>
          <div className={style.text}>Celsius</div>
          <ToggleTheme temperatureTypeChanger={temperatureTypeChanger} />
          <div className={style.text}>Fahrenheit</div>
        </div>
      </div>
    </div>
  );
});
