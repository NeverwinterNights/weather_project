import React, { ReactElement, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { DataWeatherType, deleteCityAC } from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';
import { Handle } from '../handle/Handle';

import style from './Card.module.scss';
import { Graphs } from './graphs/Graphs';
import { FavIcon } from './icon/FavIcon';
import { Map } from './map/Map';
import { Temperature } from './Temperature';

type CardPropsType = {
  city: DataWeatherType;
};

export const Card = React.memo(({ city }: CardPropsType) => {
  const dispatch = useDispatch();

  const tempType = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.temperatureType,
  );

  const selectedTempType = tempType ? '\u00B0C' : '\u00B0F';

  const [viewMode, setViewMode] = useState('card');

  const onClosedHandler = (): void => {
    dispatch(deleteCityAC(city.id));
  };

  const viewModeHandler = (value: string): void => {
    setViewMode(value);
  };

  const componentRender = (): ReactElement | ReactElement[] => {
    switch (viewMode) {
      case 'card': {
        return <Temperature selectedTempType={selectedTempType} city={city} />;
      }
      case 'graphs': {
        return <Graphs city={city} />;
      }
      case 'map': {
        return (
          <Map
            tempType={tempType}
            selectedTempType={selectedTempType}
            image={city.current.weather[0].icon}
            name={city.cityName}
            min={city.daily[0]?.temp.min}
            max={city.daily[0]?.temp.max}
            ID={city.id}
          />
        );
      }
      default:
        return <Temperature selectedTempType={selectedTempType} city={city} />;
    }
  };

  return (
    <div className={style.main}>
      <div className={style.header}>
        <FavIcon city={city} />
        <button
          className={style.delete}
          onClick={onClosedHandler}
          aria-label=" "
          type="button"
          title="Close"
        />
        <Handle viewModeHandler={viewModeHandler} />
      </div>
      {componentRender()}
    </div>
  );
});
