import React from 'react';

import { useSelector } from 'react-redux';

import { DataWeatherType } from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';

import { Card } from './Card';

export const WeatherCardContainer = React.memo(() => {
  const data = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.dataReducer,
  );

  return (
    <>
      {data.map(city => (
        <Card key={city.id} city={city} />
      ))}
    </>
  );
});
