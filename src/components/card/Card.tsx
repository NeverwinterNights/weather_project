import React, { ReactElement, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { animated, config, useTransition } from 'react-spring';

import { deleteCityAC } from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';
import { CardMapGraphsControls } from '../controls/cardMapGraphsControls/CardMapGraphsControls';
import { Graphs } from '../graphs/Graphs';
import { FavIcon } from '../icon/favIcon/FavIcon';
import { Map } from '../map/Map';
import { Temperature } from '../temperature/Temperature';

import style from './Card.module.scss';
import { CardPropsType } from './types';

export const Card = React.memo(({ city }: CardPropsType) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  const tempType = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.temperatureType,
  );

  const selectedTempType = tempType ? '\u00B0C' : '\u00B0F';

  const [typeViewMode, setTypeViewMode] = useState('card');

  const onClickCardCloseHandler = (): void => {
    setShow(!show);
    setTimeout(() => {
      dispatch(deleteCityAC(city.id));
    }, 1000);
  };

  const viewModeHandler = (value: string): void => {
    setTypeViewMode(value);
  };

  const componentRender = (): ReactElement | ReactElement[] => {
    switch (typeViewMode) {
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

  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: show,
    config: config.molasses,
  });

  return transitions(
    (styles, item) =>
      item && (
        <animated.div style={styles}>
          <div className={style.main}>
            <div className={style.header}>
              <CardMapGraphsControls viewModeHandler={viewModeHandler} />
              <FavIcon city={city} />
              <button
                className={style.delete}
                onClick={onClickCardCloseHandler}
                aria-label=" "
                type="button"
                title="Close"
              />
            </div>
            {componentRender()}
          </div>
        </animated.div>
      ),
  );
});
