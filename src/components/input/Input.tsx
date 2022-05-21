import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import useDebounce from '../../hooks/useDebounse';
import { setLocationCitiesAC, setLocationCitiesTH } from '../../state/citiesReducer';
import {
  DataWeatherType,
  getDataByInputNameTC,
  getDataByLocationTC,
  getDataByZipCodeTC,
} from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';
import { CityType } from '../../types/types';
import { conditionUtils } from '../../utils/utils';
import { InputsValuesType } from '../header/types';
import { SelectLocation } from '../selectLocation/SelectLocation';

import style from './Input.module.scss';
import { InputPropsType } from './types';

export const Input = React.memo(({ typeSearch }: InputPropsType) => {
  const [inputsValues, setInputValues] = useState<InputsValuesType>(
    {} as InputsValuesType,
  );

  const data = useSelector<AppRootStateType, DataWeatherType[]>(
    state => state.dataReducer,
  );
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(
    () => dispatch(setLocationCitiesTH(inputsValues.cityName)),
    500,
  );
  const allSearchedCities = useSelector<AppRootStateType, CityType[]>(
    state => state.citiesReducer,
  );

  const onChooseLocation = (): void => {
    if (inputsValues.cityName.length >= 3) {
      dispatch(setLocationCitiesAC([]));
      setInputValues({
        ...inputsValues,
        cityName: '',
      });
    }
  };

  const clickCityNameHandler = (): void => {
    if (conditionUtils(data, inputsValues.cityName, inputsValues.countryID)) {
      dispatch(setLocationCitiesAC([]));
      setInputValues({
        ...inputsValues,
        cityName: '',
      });
    } else {
      dispatch(getDataByInputNameTC(inputsValues.cityName));
      setInputValues({
        ...inputsValues,
        cityName: '',
      });
      dispatch(setLocationCitiesAC([]));
    }
  };

  const onKeyUpSendHandler = (): void => {
    if (inputsValues.cityName.length >= 3) {
      debouncedSearch();
    }
  };

  const countryIDHandler = (ID: string): void => {
    setInputValues({
      ...inputsValues,
      countryID: ID,
    });
  };

  const clickCoordinatesHandler = (): void => {
    dispatch(getDataByLocationTC(inputsValues.coordinatesX, inputsValues.coordinatesY));
    setInputValues({
      ...inputsValues,
      coordinatesX: 0,
      coordinatesY: 0,
    });
  };
  const clickZipHandler = (): void => {
    dispatch(getDataByZipCodeTC(inputsValues.zipCode, inputsValues.zipIndex));
    setInputValues({
      ...inputsValues,
      zipIndex: '',
      zipCode: '',
    });
  };

  const keyPressNameHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      clickCityNameHandler();
    }
  };

  const stateHandler = (str: string): void => {
    setInputValues({
      ...inputsValues,
      cityName: str,
    });
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputValues({
      ...inputsValues,
      [name]: value,
    });
    if (inputsValues.cityName) {
      dispatch(setLocationCitiesAC([]));
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <form action="">
        {typeSearch === 'city' && (
          <>
            <input
              className={style.input}
              onKeyPress={keyPressNameHandler}
              onChange={inputHandler}
              value={inputsValues.cityName}
              type="text"
              onKeyUp={onKeyUpSendHandler}
              name="cityName"
            />
            <button
              disabled={allSearchedCities.length < 1}
              type="button"
              onClick={clickCityNameHandler}
              className={style.button}
            >
              Send
            </button>
          </>
        )}
        {typeSearch === 'coordinates' && (
          <>
            <input
              className={style.cord}
              onChange={inputHandler}
              value={inputsValues.coordinatesX || ''}
              type="text"
              name="coordinatesX"
            />
            <input
              className={style.cord}
              value={inputsValues.coordinatesY || ''}
              type="text"
              name="coordinatesY"
              onChange={inputHandler}
            />
            <button
              className={style.button}
              type="button"
              onClick={clickCoordinatesHandler}
            >
              Send
            </button>
          </>
        )}
        {typeSearch === 'zip' && (
          <>
            <input
              className={style.cord}
              value={inputsValues.zipIndex}
              type="text"
              onChange={inputHandler}
              name="zipIndex"
            />
            <input
              className={style.cord}
              value={inputsValues.zipCode}
              type="text"
              name="zipCode"
              onChange={inputHandler}
            />
            <button className={style.button} type="button" onClick={clickZipHandler}>
              Send
            </button>
          </>
        )}
      </form>
      {allSearchedCities.length !== 0 && (
        <SelectLocation
          countryIDHandler={countryIDHandler}
          setCityName={stateHandler}
          onChooseLocation={onChooseLocation}
        />
      )}
    </div>
  );
});
