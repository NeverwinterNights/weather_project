import { DataWeatherType } from '../types/types';

export type FavoritesActionsType =
  | AddCityActionType
  | SetFavoritesCitiesActionType
  | DeleteCityActionType;

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
