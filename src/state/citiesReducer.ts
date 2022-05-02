import axios from 'axios';
import { Dispatch } from 'redux';

import { dataAPI } from '../api/apiData';
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
        // AdministrativeArea: city.AdministrativeArea.EnglishName,
        CountryID: city.components['ISO_3166-1_alpha-2'],
        CountryName: city.components.country,
        // CountryName: city.formatted.split(',')[]
        // eslint-disable-next-line no-nested-ternary
        // CityName: city.components.city
        //   ? city.components.city
        //   : city.components.town
        //   ? city.components.town
        //   : city.components.village,
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

// export const setLocationCitiesTH = (name: string) => (dispatch: Dispatch) => {
//   dataAPI
//     .getCity(name)
//     .then(res => {
//       dispatch(setLocationCitiesAC(res.data));
//     })
//     .catch(err => {
//       if (axios.isAxiosError(err) && err.response) {
//         dispatch(setErrorAC(err.response.data.Message));
//       }
//     });
// };

// work

// export const setLocationCitiesTH = (name: string) => (dispatch: Dispatch) => {
//   dataAPI
//     .getLocationHints(name)
//     .then(res => {
//       // const filteredResponse = res.data.results.filter(
//       //   // eslint-disable-next-line no-underscore-dangle
//       //   town => town.components._type === 'city' || town.components._type === 'village',
//       // );
//
//       dispatch(setLocationCitiesAC(res.data.results));
//     })
//     .catch(err => {
//       if (axios.isAxiosError(err) && err.response) {
//         dispatch(setErrorAC(err.response.data.status.message));
//       }
//     });
// };

export const setLocationCitiesTH = (name: string) => async (dispatch: Dispatch) => {
  const res = await dataAPI.getLocationHints(name);
  try {
    dispatch(setLocationCitiesAC(res.data.results));
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      dispatch(setErrorAC(e.response.data.status.message));
    }
  }
};
