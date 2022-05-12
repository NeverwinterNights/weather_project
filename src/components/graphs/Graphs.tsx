import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { v1 } from 'uuid';

import { weatherDataAPI } from '../../api/apiData';
import { AppRootStateType } from '../../state/store';
import {
  CityType,
  DailyDataType,
  DataWeatherType,
  TypeDataType,
} from '../../types/types';
import { fromPascalToMM, nameToUppercase, randomColor } from '../../utils/utils';

import style from './Graphs.module.scss';
import { GraphsControls } from './graphsControls/graphsControls';
import { GraphsHints } from './graphsLocation/GraphsLocation';
import { DataType, GraphsPropsType } from './types';

export const Graphs = React.memo(({ city }: GraphsPropsType) => {
  const [data, setData] = useState<DataType[]>([]);
  const [cityHints, setCityHints] = useState<CityType[]>([]);
  const type = useSelector<AppRootStateType, TypeDataType>(
    state => state.appReducer.typeData,
  );
  const [dataCityWeather, setDataCityWeather] = useState<DataWeatherType[]>([city]);
  const [value, setValue] = useState<string>('');

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
      dataCityWeather
        .map(town =>
          town.daily.map(day => ({
            name: dayjs.unix(day.dt).format('MMMM D'), // в отдельную функцию
            [town.cityName]: Math.round(graphTypeHandler(day)),
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
  }, [dataCityWeather, type]);

  const title =
    data.length !== 0
      ? data
          .map(town => Object.keys(town))[0]
          .splice(1, data.length)
          .join(' & ')
      : null;

  // const sendCityHintsRequest =  (name: string): void => {
  //   // в асинк вынести
  //   weatherDataAPI.getLocationHints(name).then(res => {
  //     const dataTown = res.data.results.map(town => ({
  //       ID: town.annotations.MGRS,
  //       CountryID: town.components['ISO_3166-1_alpha-2'],
  //       CountryName: town.components.country,
  //       CityName: town.formatted.split(',')[0],
  //       AdministrativeArea: town.formatted.split(',')[1],
  //       lat: town.geometry.lat,
  //       lot: town.geometry.lng,
  //     }));
  //     setCityHints(dataTown);
  //   });
  // };

  const sendCityHintsRequest = async (name: string): Promise<void> => {
    const res = await weatherDataAPI.getLocationHints(name);
    try {
      const dataTown = res.data.results.map(town => ({
        ID: town.annotations.MGRS,
        CountryID: town.components['ISO_3166-1_alpha-2'],
        CountryName: town.components.country,
        CityName: town.formatted.split(',')[0],
        AdministrativeArea: town.formatted.split(',')[1],
        lat: town.geometry.lat,
        lot: town.geometry.lng,
      }));
      setCityHints(dataTown);
    } catch (e) {
      console.log(e);
    }
  };

  const getQueryParamsRequest = (lat: number, lon: number): void => {
    // вынести в сервис
    setCityHints([]);
    const id: string = v1();
    weatherDataAPI.getWeatherDataFromParams(lat, lon).then(res => {
      weatherDataAPI.getWeatherDataFromCall(lat, lon).then(result => {
        setDataCityWeather([
          ...dataCityWeather,
          {
            cityName: res.data.name, // деструктиризировать
            lat: res.data.coord.lat,
            lon: res.data.coord.lon,
            mainData: res.data.main,
            id,
            current: result.data.current,
            daily: result.data.daily,
            timezone: result.data.timezone,
          },
        ]);
      });
    });
  };

  return (
    <div className={style.main}>
      <div className={style.header}>
        <div className={style.information}>
          <div className={style.title}>{title}</div>
          <div className={style.subtitle}>{type ? nameToUppercase(type) : ''}</div>
        </div>
      </div>
      <div className={style.wrap}>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            width={500} // вынести значение
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
            {title?.split(' & ').map(town => (
              <Line
                key={randomColor()}
                type="monotone"
                dataKey={town}
                stroke={randomColor()}
                strokeWidth={4}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={style.footer}>
        <GraphsControls
          setValue={setValue}
          value={value}
          sendCityHintsRequest={sendCityHintsRequest}
        />
        <GraphsHints
          setValue={setValue}
          cityHints={cityHints}
          getQueryParams={getQueryParamsRequest}
        />
      </div>
    </div>
  );
});
