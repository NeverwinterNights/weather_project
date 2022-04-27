import React, { ReactElement, useState } from 'react';

import { useDispatch } from 'react-redux';

import { DataWeatherType, deleteCityAC } from '../../state/dataReducer';
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
        return <Temperature city={city} />;
      }
      case 'graphs': {
        return <Graphs city={city} />;
      }
      case 'map': {
        return <Map ID={city.id} />;
      }
      default:
        return <Temperature city={city} />;
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
