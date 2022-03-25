import React from 'react';

import { useSelector } from 'react-redux';

import { AppRootStateType } from '../../state/store';
import { DataWeatherResponseType } from '../../types/types';
import { changeTemp } from '../../utils/utils';
import { Icon } from '../icon/Icon';

import style from './Current.module.scss';

type CurrentPropsType = {
  time: string;
};

export const Current = React.memo(({ time }: CurrentPropsType) => {
  const data = useSelector<AppRootStateType, DataWeatherResponseType>(
    state => state.currentReducer,
  );
  const tempType = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.temperatureType,
  );

  return (
    <div className={style.wrapper}>
      <div className={style.main}>
        <Icon name={data.weather && data.weather[0].icon} size={4} />
      </div>
      <div className={style.info}>
        <div className={style.wrap}>
          <div className={style.city}>
            <div className={`${style.item} ${style.name}`}>{data.name}</div>
            <div className={`${style.item} ${style.date}`}>{time}</div>
            <div className={`${style.item} ${style.temp}`}>
              Temperature -{' '}
              {data.main && changeTemp(tempType, Math.round(data.main.temp))}{' '}
              {tempType ? <span>&deg;C</span> : <span>&deg;F</span>}
            </div>
            <div className={`${style.item} ${style.feels}`}>
              Feels Like -{' '}
              {data.main && changeTemp(tempType, Math.round(data.main.feels_like))}{' '}
              {tempType ? <span>&deg;C</span> : <span>&deg;F</span>}
            </div>
          </div>
          <div className={`${style.item} ${style.humidity}`}>
            Humidity - {data.main && data.main.humidity}%
          </div>
          <div className={`${style.item} ${style.pressure}`}>
            Pressure - {data.main && data.main.pressure}mmHg
          </div>
          <div className={`${style.item} ${style.wing}`}>
            Wind speed - {data.wind && data.wind.speed}m/s
          </div>
        </div>
      </div>
    </div>
  );
});
