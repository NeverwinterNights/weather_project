import React, { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import useDebounce from '../../../../hooks/useDebounse';
import { changeGraphsTypeAC } from '../../../../state/appReducer';

import style from './GraphsControls.module.scss';

type GraphsControlsPropsType = {
  sendCityHintsRequest: (name: string) => void;
  value: string;
  setValue: (value: string) => void;
};

type Button = 'temperature' | 'pressure' | 'humidity';

export const GraphsControls = React.memo(
  ({ sendCityHintsRequest, value, setValue }: GraphsControlsPropsType) => {
    const [clicked, setClicked] = useState<Button>('temperature');
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

    const onClickHandler = (val: Button): void => {
      dispatch(changeGraphsTypeAC(val));
      setClicked(val);
    };

    return (
      <div className={style.main}>
        <div className={style.buttons}>
          <button
            style={
              clicked === 'temperature'
                ? { backgroundColor: '#637479', color: '#ffd0a6' }
                : {}
            }
            className={style.button}
            onClick={() => {
              onClickHandler('temperature');
            }}
            type="button"
          >
            Temperature
          </button>
          <button
            style={
              clicked === 'humidity'
                ? { backgroundColor: '#637479', color: '#ffd0a6' }
                : {}
            }
            className={style.button}
            onClick={() => onClickHandler('humidity')}
            type="button"
          >
            Humidity
          </button>
          <button
            style={
              clicked === 'pressure'
                ? { backgroundColor: '#637479', color: '#ffd0a6' }
                : {}
            }
            className={style.button}
            onClick={() => onClickHandler('pressure')}
            type="button"
          >
            Pressure
          </button>
        </div>
        <div className={style.input}>
          <input onChange={inputHandler} value={value} />
          {/* <button type="button">Send</button> */}
        </div>
      </div>
    );
  },
);
