import React from 'react';

import dayjs from 'dayjs';

import moon from '../../../images/moon.svg';
import sun from '../../../images/sun.svg';
import { DataWeatherType } from '../../../state/dataReducer';
import style from '../Temperature.module.scss';

type WeekCardPropsType = {
  city: DataWeatherType;
  selectedTempType: string;
  max: number;
  min: number;
};

export const WeekForecast = React.memo(
  ({ city, selectedTempType, max, min }: WeekCardPropsType) => (
    <div className={style.footer}>
      {city.daily.map(day => (
        <div key={day.dt} className={style.elem}>
          <div className={style.column}>
            <div className={style.card}>
              <div className={style.row}>{`${dayjs.unix(day.dt).format('MMMM D')}`}</div>
              <div className={style.row}>{`${dayjs.unix(day.dt).format('dddd')}`}</div>
              <div className={style.row}>
                <img src={sun} alt="day" />
                <span>{`${max} ${selectedTempType}`}</span>
              </div>
              <div className={style.row}>
                <img src={moon} alt="night" />
                <span>{`${min} ${selectedTempType}`}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
);
