import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import useDebounce from '../../hooks/useDebounse';
import { setLocationCitiesAC, setLocationCitiesTH } from '../../state/citiesReducer';
import {
  DataWeatherType,
  getDataByCityNameTC,
  getDataByLocationTC,
  getDataByZipCodeTC,
} from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';
import { CityType, TypeSearchTypes } from '../../types/types';
import { conditionUtils } from '../../utils/utils';
import { SelectLocation } from '../selectLocation/SelectLocation';

import style from './Input.module.scss';

type InputPropsType = {
  typeSearch: TypeSearchTypes;
};

export const Input = React.memo(({ typeSearch }: InputPropsType) => {
  const [cityName, setCityName] = useState<string>('');
  const [zipIndex, setZipIndex] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [coordinatesX, setCoordinatesX] = useState<number>(0);
  const [coordinatesY, setCoordinatesY] = useState<number>(0);

  const data = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.dataReducer,
  );
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(() => dispatch(setLocationCitiesTH(cityName)), 500);

  const onChooseLocation = (): void => {
    if (cityName.length >= 3) {
      dispatch(setLocationCitiesAC([]));
      setCityName('');
    }
  };
  const allSearchedCities = useSelector<AppRootStateType, CityType[]>(
    state => state.citiesReducer,
  );

  const clickCityNameHandler = (): void => {
    if (conditionUtils(data, cityName)) {
      dispatch(setLocationCitiesAC([]));
      setCityName('');
    } else {
      dispatch(getDataByCityNameTC(cityName, ''));
      setCityName('');
      dispatch(setLocationCitiesAC([]));
    }
  };

  const clickCoordinatesHandler = (): void => {
    dispatch(getDataByLocationTC(coordinatesX, coordinatesY));
    setCoordinatesX(0);
    setCoordinatesY(0);
  };
  const clickZipHandler = (): void => {
    dispatch(getDataByZipCodeTC(zipCode, zipIndex));
    setZipIndex('');
    setZipCode('');
  };

  const keyPressNameHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      clickCityNameHandler();
    }
  };

  const onChangeInputByName = (e: ChangeEvent<HTMLInputElement>): void => {
    setCityName(e.currentTarget.value);
    if (cityName) {
      dispatch(setLocationCitiesAC([]));
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <form action="">
        {typeSearch === 'city' && (
          <>
            <input
              onKeyPress={keyPressNameHandler}
              onChange={onChangeInputByName}
              value={cityName}
              type="text"
              onKeyUp={() => {
                debouncedSearch();
              }}
            />
            <button type="button" onClick={clickCityNameHandler}>
              Send
            </button>
          </>
        )}
        {typeSearch === 'coordinates' && (
          <>
            <input
              className={style.cord}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCoordinatesX(+e.currentTarget.value);
              }}
              value={coordinatesX || ''}
              type="text"
            />
            <input
              className={style.cord}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCoordinatesY(+e.currentTarget.value);
              }}
              value={coordinatesY || ''}
              type="text"
            />
            <button type="button" onClick={clickCoordinatesHandler}>
              Send
            </button>
          </>
        )}
        {typeSearch === 'zip' && (
          <>
            <input
              className={style.cord}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setZipIndex(e.currentTarget.value);
              }}
              value={zipIndex}
              type="text"
            />
            <input
              className={style.cord}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setZipCode(e.currentTarget.value);
              }}
              value={zipCode}
              type="text"
            />
            <button type="button" onClick={clickZipHandler}>
              Send
            </button>
          </>
        )}
      </form>
      {allSearchedCities.length !== 0 && (
        <SelectLocation onChooseLocation={onChooseLocation} />
      )}
    </div>
  );
});
