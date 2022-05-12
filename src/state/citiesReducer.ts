import axios from 'axios';
import { Dispatch } from 'redux';

import { weatherDataAPI } from '../api/apiData';
import { CityLoc, CityType } from '../types/types';

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
      return <CityType[]>action.cities.map(city => ({
        ID: city.annotations.MGRS,
        CountryID: city.components['ISO_3166-1_alpha-2'],
        CountryName: city.components.country,
        CityName: city.formatted.split(',')[0],
        AdministrativeArea: city.formatted.split(',')[1],
        lat: city.geometry.lat,
        lot: city.geometry.lng,
      }));
    }
    default:
      return state;
  }
};

export const setLocationCitiesAC = (cities: CityLoc[]) =>
  ({
    type: 'SET-LOCATION-CITIES',
    cities,
  } as const);

export type SetLocationCitiesActionType = ReturnType<typeof setLocationCitiesAC>;

export const setLocationCitiesTH = (name: string) => async (dispatch: Dispatch) => {
  const res = await weatherDataAPI.getLocationHints(name);
  try {
    dispatch(setLocationCitiesAC(res.data.results));
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      dispatch(setErrorAC(e.response.data.status.message));
    }
  }
};
