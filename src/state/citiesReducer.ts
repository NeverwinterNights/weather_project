import axios from 'axios';
import { Dispatch } from 'redux';

import { dataAPI } from '../api/apiData';
import { CityResponseType, CityType } from '../types/types';

import { setErrorAC } from './errorReducer';

export type CityActionsType = SetLocationCitiesActionType;

export type CitiesStateType = CityType[];

const initialState = [] as CityType[];

export const citiesReducer = (
  state: CitiesStateType = initialState,
  action: CityActionsType,
): CitiesStateType => {
  switch (action.type) {
    case 'SET-LOCATION-CITIES': {
      return action.cities.map(city => ({
        ID: city.Key,
        AdministrativeArea: city.AdministrativeArea.EnglishName,
        CountryID: city.Country.ID,
        CountryName: city.Country.EnglishName,
        CityName: city.LocalizedName,
        lat: city.GeoPosition.Latitude,
        lot: city.GeoPosition.Longitude,
      }));
    }
    default:
      return state;
  }
};

export const setLocationCitiesAC = (cities: CityResponseType[]) =>
  ({
    type: 'SET-LOCATION-CITIES',
    cities,
  } as const);

export type SetLocationCitiesActionType = ReturnType<typeof setLocationCitiesAC>;

export const setLocationCitiesTH = (name: string) => (dispatch: Dispatch) => {
  dataAPI
    .getCity(name)
    .then(res => {
      dispatch(setLocationCitiesAC(res.data));
    })
    .catch(err => {
      if (axios.isAxiosError(err) && err.response) {
        dispatch(setErrorAC(err.response.data.Message));
      }
    });
};
