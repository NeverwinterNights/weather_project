import React, { KeyboardEvent } from 'react';

import { CityType } from '../../../../types/types';

import style from './GraphsLocation.module.scss';

type GraphsLocationPropsType = {
  cityHints: CityType[];
  getQueryParams: (lat: number, lon: number) => void;
  setValue: (value: string) => void;
};

export const GraphsHints = React.memo(
  ({ cityHints, getQueryParams, setValue }: GraphsLocationPropsType) => (
    <div className={style.block}>
      {cityHints && (
        <div className={style.main}>
          <div className={style.body}>
            {cityHints.map(city => {
              const keyPressNameHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  getQueryParams(city.lat, city.lot);
                }
              };
              return (
                <div
                  tabIndex={0}
                  onKeyPress={keyPressNameHandler}
                  role="button"
                  className={style.row}
                  key={city.ID}
                  onClick={() => {
                    getQueryParams(city.lat, city.lot);
                    setValue('');
                  }}
                >
                  <span className={`${style.item} ${style.city}`}>{city.CityName},</span>
                  <span className={`${style.item} ${style.area}`}>
                    {city.AdministrativeArea},
                  </span>
                  <span className={`${style.item} ${style.area}`}>{city.CountryID},</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  ),
);
