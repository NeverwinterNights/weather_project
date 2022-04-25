import React, { ChangeEvent, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import useDebounce from '../../../../hooks/useDebounse';
import { changeGraphsTypeAC } from '../../../../state/appReducer';

import style from './GraphsControls.module.scss';

type GraphsControlsPropsType = {
  sendCityHintsRequest: (name: string) => void;
  value: string;
  setValue: (value: string) => void;
};

export const GraphsControls = React.memo(
  ({ sendCityHintsRequest, value, setValue }: GraphsControlsPropsType) => {
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

    const tempOnClickHandler = (): void => {
      dispatch(changeGraphsTypeAC('temperature'));
    };

    const humidityOnClickHandler = (): void => {
      dispatch(changeGraphsTypeAC('humidity'));
    };

    const pressureOnClickHandler = (): void => {
      dispatch(changeGraphsTypeAC('pressure'));
    };

    return (
      <div className={style.main}>
        <button onClick={tempOnClickHandler} type="button">
          Temperature
        </button>
        <button onClick={humidityOnClickHandler} type="button">
          Humidity
        </button>
        <button onClick={pressureOnClickHandler} type="button">
          Pressure
        </button>
        <div>
          <input onChange={inputHandler} value={value} />
          {/* <button type="button">Send</button> */}
        </div>
      </div>
    );
  },
);
