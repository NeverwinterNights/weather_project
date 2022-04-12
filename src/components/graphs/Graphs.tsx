import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { AppRootStateType } from '../../state/store';
import { DailyDataType, DataWeatherType, TypeDataType } from '../../types/types';
import { fromPascalToMM, randomColor } from '../../utils/utils';
import { Controls } from '../controls/Controls';
import { Handle } from '../handle/Handle';

import style from './Graphs.module.scss';
import { GraphsControls } from './graphsControls/graphsControls';

type DataType = {
  name: string;
  [key: string]: number | string;
};

export const Graphs = React.memo(() => {
  const [data, setData] = useState<DataType[]>([]);
  const type = useSelector<AppRootStateType, TypeDataType>(
    state => state.appReducer.typeData,
  );

  const cities = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.dataReducer,
  );

  const graphTypeHandler = (daily: DailyDataType): number => {
    switch (type) {
      case 'temperature': {
        return daily.temp.day;
      }
      case 'humidity': {
        return daily.humidity;
      }
      case 'pressure': {
        return fromPascalToMM(daily.pressure);
      }
      default: {
        return daily.temp.day;
      }
    }
  };

  useEffect(() => {
    setData(
      cities
        .map(city =>
          city.daily.map(day => ({
            name: dayjs.unix(day.dt).format('MMMM D'),
            // [city.cityName]: Math.round(day.temp.day),
            [city.cityName]: Math.round(graphTypeHandler(day)),
          })),
        )
        .reduce((previousValue, currentValue) => {
          if (!previousValue.length) return currentValue;

          return previousValue.map((previousObj: any, index: number) => ({
            ...previousObj,
            ...currentValue[index],
          }));
        }, []),
    );
  }, [cities, type]);

  const title =
    data.length !== 0
      ? data
          .map(city => Object.keys(city))[0]
          .splice(1, data.length)
          .join(' & ')
      : null;

  return (
    <div className={style.main}>
      <div className={style.header}>
        <div className={style.title}>{title}</div>
        <div className={style.subtitle}>
          {type ? type[0].toUpperCase() + type.slice(1) : ''}
        </div>
        <div className={style.controls}>
          <Handle />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {title?.split(' & ').map(city => (
            <Line
              key={randomColor()}
              type="monotone"
              dataKey={city}
              stroke={randomColor()}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <div className={style.footer}>
        <Controls />
        <GraphsControls />
      </div>
    </div>
  );
});
