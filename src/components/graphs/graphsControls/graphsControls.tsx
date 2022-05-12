import React, { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import useDebounce from '../../../hooks/useDebounse';
import { changeGraphsTypeAC } from '../../../state/appReducer';
import { ButtonControls } from '../../controls/buttonControls/ButtonControls';

import style from './GraphsControls.module.scss';
import { GraphsButtonType, GraphsControlsPropsType } from './types';

export const GraphsControls = React.memo(
  ({ sendCityHintsRequest, value, setValue }: GraphsControlsPropsType) => {
    const [clickedTypeCard, setClickedTypeCard] =
      useState<GraphsButtonType>('temperature');
    const dispatch = useDispatch();

    const debouncedSearch = useDebounce(() => sendCityHintsRequest(value), 500);

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      setValue(e.currentTarget.value);
    };

    useEffect(() => {
      if (value.length >= 3) {
        debouncedSearch();
      }
    }, [value]);

    const onClickHandler = (val: GraphsButtonType): void => {
      dispatch(changeGraphsTypeAC(val));
      setClickedTypeCard(val);
    };

    return (
      <div className={style.main}>
        <div className={style.buttons}>
          <ButtonControls
            onClickHandler={() => {
              onClickHandler('temperature');
            }}
            value="temperature"
            checked={clickedTypeCard === 'temperature'}
          />
          <ButtonControls
            onClickHandler={() => {
              onClickHandler('humidity');
            }}
            value="humidity"
            checked={clickedTypeCard === 'humidity'}
          />
          <ButtonControls
            onClickHandler={() => {
              onClickHandler('pressure');
            }}
            value="pressure"
            checked={clickedTypeCard === 'pressure'}
          />
        </div>
        <div className={style.input}>
          <input onChange={inputHandler} value={value} />
        </div>
      </div>
    );
  },
);
