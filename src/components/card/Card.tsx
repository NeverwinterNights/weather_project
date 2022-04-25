import React, { ReactElement, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { DataWeatherType, deleteCityAC } from '../../state/dataReducer';
import { addCityAC } from '../../state/favoritesReducer';
import { AppRootStateType } from '../../state/store';
import { conditionUtils } from '../../utils/utils';
import { Handle } from '../handle/Handle';

import style from './Card.module.scss';
import { Graphs } from './graphs/Graphs';
import { Map } from './map/Map';
import { Temperature } from './Temperature';

type CardPropsType = {
  city: DataWeatherType;
};

export const Card = React.memo(({ city }: CardPropsType) => {
  const dispatch = useDispatch();

  const [viewMode, setViewMode] = useState('card');
  const favoritesCity = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.favoritesReducer,
  );

  const onAddToFavoritesHandler = (): void => {
    if (conditionUtils(favoritesCity, city.cityName)) {
      return;
    }
    dispatch(addCityAC(city));
    localStorage.setItem('state', JSON.stringify([...favoritesCity, city]));
  };

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
        <button
          className={style.add}
          onClick={onAddToFavoritesHandler}
          aria-label=" "
          type="button"
          title="Add to Favorites"
        />
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
