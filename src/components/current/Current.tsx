import React from 'react';

import { useSelector } from 'react-redux';

import { AppRootStateType } from '../../state/store';
import { DataWeatherResponseType } from '../../types/types';
import { Icon } from '../icon/Icon';

import style from './Current.module.scss';

type CurrentPropsType = {
  time: string;
};

export const Current = React.memo(({ time }: CurrentPropsType) => {
  const data = useSelector<AppRootStateType, DataWeatherResponseType>(
    state => state.currentReducer,
  );

  return (
    <div className={style.wrapper}>
      <div className={style.main}>
        <Icon name={data.weather && data.weather[0].icon} />
      </div>
      <div className={style.info}>
        <div className={style.wrap}>
          <div className={style.city}>
            <div className={`${style.item} ${style.name}`}>{data.name}</div>
            <div className={`${style.item} ${style.date}`}>{time}</div>
            <div className={`${style.item} ${style.temp}`}>
              Temperature - {data.main && data.main.temp}&deg;C
            </div>
            <div className={`${style.item} ${style.feels}`}>
              Feels Like - {data.main && data.main.feels_like}&deg;C
            </div>
          </div>
          <div className={`${style.item} ${style.humidity}`}>
            Pressure - {data.main && data.main.humidity}%
          </div>
          <div className={`${style.item} ${style.pressure}`}>
            {data.main && data.main.pressure}mmHg
          </div>
          <div className={`${style.item} ${style.wing}`}>
            Wind speed - {data.wind && data.wind.speed}m/s
          </div>
        </div>
      </div>
    </div>
  );
});
