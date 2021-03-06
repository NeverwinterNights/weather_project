import React, { KeyboardEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setLocationCitiesAC } from '../../state/citiesReducer';
import { DataWeatherType, getDataByCityNameTC } from '../../state/dataReducer';
import { AppRootStateType } from '../../state/store';
import { CityType } from '../../types/types';
import { conditionUtils } from '../../utils/utils';

import style from './SelectLocation.module.scss';
import { SelectLocationPropsType } from './types';

export const SelectLocation = React.memo(
  ({ onChooseLocation, setCityName, countryIDHandler }: SelectLocationPropsType) => {
    const dispatch = useDispatch();

    const allSearchedCities = useSelector<AppRootStateType, CityType[]>(
      state => state.citiesReducer,
    );
    const data = useSelector<AppRootStateType, DataWeatherType[]>(
      state => state.dataReducer,
    );

    const clickSelectLocationHandler = (
      cityName: string,
      lat: number,
      lon: number,
      countryID: string,
    ): void => {
      if (conditionUtils(data, cityName, countryID)) {
        setCityName('');
        dispatch(setLocationCitiesAC([]));
      } else {
        onChooseLocation();
        dispatch(getDataByCityNameTC(cityName, lat, lon, countryID));
        countryIDHandler(countryID);
      }
    };
    return (
      <div>
        {allSearchedCities && (
          <div className={style.main}>
            <div className={style.body}>
              {allSearchedCities.map(city => {
                const onChooseCityKeyboard = (
                  e: KeyboardEvent<HTMLInputElement>,
                ): void => {
                  if (e.key === 'Enter') {
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
                      clickSelectLocationHandler(
                        city.CityName,
                        city.lat,
                        city.lot,
                        city.CountryID,
                      );
                    }}
                  >
                    <span className={`${style.item} ${style.city}`}>
                      {city.CityName},
                    </span>
                    <span className={`${style.item} ${style.area}`}>
                      {city.AdministrativeArea},
                    </span>
                    <span className={`${style.item} ${style.area}`}>
                      {city.CountryID},
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
