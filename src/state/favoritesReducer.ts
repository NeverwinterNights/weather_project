import { Dispatch } from 'redux';

import { dataAPI } from '../api/apiData';
import { CurrentWeatherType, DataWeatherType } from '../types/types';

export type FavoritesActionsType =
  | AddCityActionType
  | SetFavoritesCitiesActionType
  | DeleteCityActionType
  | UpdateFavoritesCitiesActionType;

const initialState: DataWeatherType[] = [] as DataWeatherType[];

export const favoritesReducer = (
  state: DataWeatherType[] = initialState,
  action: FavoritesActionsType,
): DataWeatherType[] => {
  switch (action.type) {
    case 'ADD-CITY': {
      return [...state, action.city];
    }
    case 'SET-CITIES': {
      return [...state, ...action.cities];
    }
    case 'DELETE-CITY': {
      return state.filter(town => town.id !== action.cityId);
    }
    case 'UPDATE-CITIES': {
      // return state.map(city => ({ ...city, current: action.current }));
      return state.map(city =>
        city.id === action.id ? { ...city, current: action.current } : city,
      );
    }
    default:
      return state;
  }
};

export const addCityAC = (city: DataWeatherType) => ({ type: 'ADD-CITY', city } as const);

export type AddCityActionType = ReturnType<typeof addCityAC>;

export const deleteCityFromFavoritesAC = (cityId: string) =>
  ({ type: 'DELETE-CITY', cityId } as const);

export type DeleteCityActionType = ReturnType<typeof deleteCityFromFavoritesAC>;

export const setFavoritesCitiesAC = (cities: DataWeatherType[]) =>
  ({ type: 'SET-CITIES', cities } as const);

export type SetFavoritesCitiesActionType = ReturnType<typeof setFavoritesCitiesAC>;

export const updateFavoritesCitiesAC = (current: CurrentWeatherType, id: string) =>
  ({ type: 'UPDATE-CITIES', current, id } as const);

export type UpdateFavoritesCitiesActionType = ReturnType<typeof updateFavoritesCitiesAC>;

//
// export const setFavoritesCitiesAC = (cityName: string, lat: number, lon: number) =>
//   ({ type: 'SET-CITIES', cityName, lat, lon } as const);
//
// export type SetFavoritesCitiesActionType = ReturnType<typeof setFavoritesCitiesAC>;

export const updateFavoritesTC =
  (lat: number, lon: number, id: string) => (dispatch: Dispatch) => {
    dataAPI
      .getDataFromCall(lat, lon)
      .then(res => {
        dispatch(updateFavoritesCitiesAC(res.data.current, id));
      })
      .catch(err => {
        console.log(err);
      });
  };
