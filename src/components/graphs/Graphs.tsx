import React, { useEffect, useState } from 'react';

// import dayjs from 'dayjs';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// import { DataWeatherType } from '../../state/dataReducer';
// import { AppRootStateType } from '../../state/store';
import { AppRootStateType } from '../../state/store';
import { DataWeatherType } from '../../types/types';
import { Controls } from '../controls/Controls';

import style from './Graphs.module.scss';

export const Graphs = React.memo(() => {
  const [data, setData] = useState<any[]>([]);
  const cities = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.dataReducer,
  );
  useEffect(() => {
    // setData(
    //   cities.map(city =>
    //     city.daily.map(day => ({
    //       name: dayjs.unix(day.dt).format('MMMM D'),
    //       [city.cityName]: Math.round(day.temp.day),
    //     })),
    //   ),
    // );

    setData(
      cities
        .map(city =>
          city.daily.map(day => ({
            name: dayjs.unix(day.dt).format('MMMM D'),
            [city.cityName]: Math.round(day.temp.day),
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
  }, [cities]);

  console.log(data);

  // useEffect(() => {
  //   cities.forEach(city => {
  //     const arrr: any[] = [];
  //     city.daily.forEach(day => {
  //       const date = dayjs.unix(day.dt).format('MMMM D');
  //       if (data.length === 8) {
  //         const result = data.map(el =>
  //           el.name === date ? { ...el, [city.cityName]: day.temp.day } : el,
  //         );
  //
  //         // const result = data.map(el => {
  //         //   // eslint-disable-next-line no-debugger
  //         //   debugger;
  //         //   const a = { ...el, [city.cityName]: day.temp.day };
  //         //   return a;
  //         // });
  //         console.log(result);
  //         // setData(result);
  //       } else {
  //         const obj = { name: date, [city.cityName]: day.temp.day };
  //         arrr.push(obj);
  //       }
  //       if (data.length !== 8) {
  //         setData([...data, ...arrr]);
  //       }
  //     });
  //   });
  // }, [cities]);
  // console.log(data);

  return (
    <div className={style.main}>
      <ResponsiveContainer width="100%" height="100%">
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
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="amt" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <div className={style.footer}>
        <Controls />
      </div>
    </div>
  );
});
