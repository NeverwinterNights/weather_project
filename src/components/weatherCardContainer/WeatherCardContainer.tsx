import React, { useCallback, useEffect, useState } from 'react';

import update from 'immutability-helper';
import { useSelector } from 'react-redux';

import { DataWeatherType } from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';
import { DragCard } from '../dragCard/DragCard';

export const WeatherCardContainer = React.memo(() => {
  const weatherData = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.dataReducer,
  );

  const [cards, setCards] = useState<DataWeatherType[]>(weatherData);

  useEffect(() => {
    setCards(weatherData);
  }, [weatherData]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: DataWeatherType[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as DataWeatherType],
        ],
      }),
    );
  }, []);
  return (
    <>
      {cards.map((city, i) => (
        <DragCard key={city.id} index={i} city={city} moveCard={moveCard} id={city.id} />
      ))}
    </>
  );
});
