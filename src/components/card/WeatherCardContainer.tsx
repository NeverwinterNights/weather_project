import React, { ReactElement, useState } from 'react';

import { useSelector } from 'react-redux';

import { ViewModeType } from '../../state/appReducer';
import { DataWeatherType } from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';
import { Graphs } from '../graphs/Graphs';
import { Map } from '../map/Map';

import { WeatherCard } from './WeatherCard';

export const WeatherCardContainer = React.memo(() => {
  const data = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.dataReducer,
  );
  const viewMode = useSelector<AppRootStateType, ViewModeType>(
    state => state.appReducer.viewMode,
  );
  // const [ID, setID] = useState<string>('');
  const [ID, setID] = useState<string[]>([]);
  const getID = (id: string): void => {
    if (ID.length) {
      setID(prev => (prev.some(el => el === id) ? prev : [...prev, id]));
    } else {
      setID([id]);
    }
  };
  // const getID = (id: string): void => {
  //   setID(id);
  //   }
  // };

  const componentRender = (): ReactElement | ReactElement[] => {
    switch (viewMode) {
      case 'card': {
        return data.map(city => <WeatherCard key={city.id} city={city} getID={getID} />);
      }
      case 'graphs': {
        return <Graphs getID={getID} />;
      }
      case 'map': {
        return ID.map(id => <Map key={id} ID={id} />);
      }
      default:
        return data.map(city => <WeatherCard key={city.id} city={city} getID={getID} />);
    }
  };
  console.log('ID', ID);
  return <>{componentRender()}</>;
});
