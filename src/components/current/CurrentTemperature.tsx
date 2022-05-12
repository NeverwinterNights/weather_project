import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { AppRootStateType } from '../../state/store';
import { DataWeatherResponseType } from '../../types/types';
import { changeTemp, fromPascalToMM } from '../../utils/utils';
import { IconWeather } from '../icon/iconWeather/IconWeather';

import style from './CurrentTemperature.module.scss';

const StyledCurrent = styled.div`
  ${({ theme }) => theme.colors.current}
  //background: cornflowerblue;
  margin-bottom: 25px;
  border-radius: 30px;
  padding: 10px 20px;
  display: flex;
`;

export const CurrentTemperature = React.memo(() => {
  const dataWeather = useSelector<AppRootStateType, DataWeatherResponseType>(
    state => state.currentReducer,
  );
  const time = useSelector<AppRootStateType, string>(state => state.appReducer.time);

  const tempType = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.temperatureType,
  );
  const currentTemp = useMemo(
    () => ({
      current: changeTemp(tempType, Math.round(dataWeather?.main?.temp)),
      feels: changeTemp(tempType, Math.round(dataWeather?.main?.feels_like)),
      pressure: fromPascalToMM(dataWeather?.main?.pressure),
      wind: Math.round(dataWeather.wind?.speed),
    }),
    [dataWeather.main, tempType],
  );
  const selectedTempType = tempType ? '\u00B0C' : '\u00B0F';

  return (
    <StyledCurrent>
      <div className={style.main}>
        <div className={style.image}>
          <IconWeather name={dataWeather.weather?.[0].icon} size={4} />
        </div>
        <div className={style.name}>{dataWeather.name}</div>
        <div className={style.temp}>{`${currentTemp.current} ${selectedTempType}`}</div>
      </div>
      <div className={style.info}>
        <div className={style.wrap}>
          <div className={style.city}>
            <div className={style.item}>{time}</div>
            <div className={style.item}>
              {`Feels Like ${currentTemp.feels} ${selectedTempType}`}
            </div>
          </div>
          <div className={style.item}>{`Humidity ${dataWeather?.main?.humidity}%`}</div>
          <div className={style.item}>{`Pressure ${currentTemp.pressure} mmHg`}</div>
          <div className={style.item}>{`Wind speed ${currentTemp.wind} m/s`}</div>
        </div>
      </div>
    </StyledCurrent>
  );
});
