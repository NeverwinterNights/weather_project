import React, { ChangeEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import useDebounce from '../../hooks/useDebounse';
import { setLocationCitiesAC, setLocationCitiesTH } from '../../state/citiesReducer';
import {
  getDataByCityNameTC,
  getDataByLocationTC,
  getDataByZipCodeTC,
} from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';
import { CityType, TypeSearchTypes } from '../../types/types';
import { SelectLocation } from '../selectLocation/SelectLocation';

import style from './Input.module.scss';

type InputPropsType = {
  typeSearch: TypeSearchTypes;
  // onClickInputSearch: (value: string) => void;
  // onInputCityNameHandler: (value: string) => void;
  // onInputZipHandler: (value: string) => void;
  // onInputCoordinatesXHandler: (value: number) => void;
  // onInputCoordinatesYHandler: (value: number) => void;
};

export const Input = React.memo(({ typeSearch }: InputPropsType) => {
  const [cityName, setCityName] = useState<string>('');
  const [zipIndex, setZipIndex] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [coordinatesX, setCoordinatesX] = useState<number>(0);
  const [coordinatesY, setCoordinatesY] = useState<number>(0);

  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(() => dispatch(setLocationCitiesTH(cityName)), 500);

  const onChooseLocation = (name: string, country: string): void => {
    if (cityName.length >= 3) {
      setCityName(`${name}, ${country}`);
      dispatch(setLocationCitiesAC([]));
    }
  };
  const allSearchedCities = useSelector<AppRootStateType, CityType[]>(
    state => state.citiesReducer,
  );

  return (
    <div style={{ position: 'relative' }}>
      <form action="">
        {typeSearch === 'city' && (
          <>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCityName(e.currentTarget.value);
              }}
              value={cityName}
              type="text"
              onKeyUp={() => {
                debouncedSearch();
              }}
            />
            <button
              type="button"
              onClick={() => {
                dispatch(getDataByCityNameTC(cityName));
                setCityName('');
                dispatch(setLocationCitiesAC([]));
              }}
            >
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
              value={coordinatesX}
              type="text"
            />
            <input
              className={style.cord}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCoordinatesY(+e.currentTarget.value);
              }}
              value={coordinatesY}
              type="text"
            />
            <button
              type="button"
              onClick={() => {
                dispatch(getDataByLocationTC(coordinatesX, coordinatesY));
                setCoordinatesX(0);
                setCoordinatesY(0);
              }}
            >
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
            <button
              type="button"
              onClick={() => {
                dispatch(getDataByZipCodeTC(zipCode, zipIndex));
                setZipIndex('');
                setZipCode('');
              }}
            >
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
