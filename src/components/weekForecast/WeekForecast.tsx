import React from 'react';

import dayjs from 'dayjs';

import moon from '../../images/moon.svg';
import sun from '../../images/sun.svg';
import style from '../temperature/Temperature.module.scss';

import { WeekCardPropsType } from './types';

export const WeekForecast = React.memo(
  ({ city, selectedTempType }: WeekCardPropsType) => (
    <div className={style.footer}>
      {city.daily.map(day => (
        <div key={day.dt} className={style.elem}>
          <div className={style.column}>
            <div className={style.card}>
              <div className={style.row}>{`${dayjs.unix(day.dt).format('MMMM D')}`}</div>
              <div className={style.row}>{`${dayjs.unix(day.dt).format('dddd')}`}</div>
              <div className={style.row}>
                <img src={sun} alt="day" />
                <span>{`${Math.round(day.temp.max)} ${selectedTempType}`}</span>
              </div>
              <div className={style.row}>
                <img src={moon} alt="night" />
                <span>{`${Math.round(day.temp.min)} ${selectedTempType}`}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
);
