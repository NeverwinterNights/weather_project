import React, { KeyboardEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setLocationCitiesAC } from '../../state/citiesReducer';
import { getDataByCityNameTC } from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';
import { CityType } from '../../types/types';

import style from './SelectLocation.module.scss';

type SelectLocationPropsType = {
  onChooseLocation: () => void;
};

export const SelectLocation = React.memo(
  ({ onChooseLocation }: SelectLocationPropsType) => {
    const dispatch = useDispatch();

    const allSearchedCities = useSelector<AppRootStateType, CityType[]>(
      state => state.citiesReducer,
    );

    return (
      <div>
        {allSearchedCities && (
          <div className={style.main}>
            <div className={style.body}>
              {allSearchedCities.map(city => {
                const onChooseCityKeyboard = (
                  e: KeyboardEvent<HTMLInputElement>,
                ): void => {
                  if (e.charCode === 13) {
                    onChooseLocation();
                    dispatch(setLocationCitiesAC([]));
                  }
                };
                return (
                  <div
                    tabIndex={0}
                    onKeyPress={onChooseCityKeyboard}
                    role="button"
                    className={style.row}
                    key={city.ID}
                    onClick={() => {
                      onChooseLocation();
                      dispatch(getDataByCityNameTC(city.CityName));
                    }}
                  >
                    <span className={`${style.item} ${style.city}`}>
                      {city.CityName},
                    </span>
                    <span className={`${style.item} ${style.area}`}>
                      {city.AdministrativeArea},
                    </span>
                    <span className={`${style.item} ${style.country}`}>
                      {city.CountryName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);