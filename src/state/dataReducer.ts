import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { v1 } from 'uuid';

import { dataAPI } from '../api/apiData';
import { CurrentWeatherType, DailyDataType, MainWeather } from '../types/types';
import { handleThunk, utilsError } from '../utils/thunks-utils';

// import { etErrorActionType } from './errorReducer';
import { SetErrorActionType } from './errorReducer';
import { ActionsType, AppRootStateType } from './store';

export type DataActionsType =
  | SetCityNameActionType
  | AddActionType
  | DeleteCityActionType
  | GetDataFromLocationActionType
  | SetErrorActionType;

export type DataWeatherType = {
  cityName: string;
  lat: number;
  lon: number;
  mainData: MainWeather;
  id: string;
  current: CurrentWeatherType;
  daily: Array<DailyDataType>;
  timezone: string;
  country?: string;
};

const initialState: DataWeatherType[] = [] as DataWeatherType[];

export const dataReducer = (
  state: DataWeatherType[] = initialState,
  action: DataActionsType,
): DataWeatherType[] => {
  switch (action.type) {
    case 'SET-DATA': {
      return [
        ...state,
        {
          cityName: action.cityName,
          lat: action.lat,
          lon: action.lon,
          mainData: action.mainData,
          id: action.id,
          current: {} as CurrentWeatherType,
          daily: [],
          timezone: '',
        },
      ];
    }
    case 'SET-ADD-DATA': {
      const copyState = [...state];
      return copyState.map(city =>
        action.id === city.id
          ? {
              ...city,
              current: action.current,
              daily: action.daily,
              timezone: action.timezone,
              country: action.country,
            }
          : { ...city },
      );
    }
    case 'DELETE-CITY': {
      const copyState = [...state];
      return copyState.filter(city => city.id !== action.id);
    }
    default:
      return state;
  }
};

export const setDataCityNameAC = (
  cityName: string,
  lat: number,
  lon: number,
  mainData: MainWeather,
  id: string,
) =>
  ({
    type: 'SET-DATA',
    cityName,
    lat,
    lon,
    mainData,
    id,
  } as const);

export type SetCityNameActionType = ReturnType<typeof setDataCityNameAC>;

export const addDataAC = (
  current: CurrentWeatherType,
  daily: Array<DailyDataType>,
  timezone: string,
  id: string,
  country: string | undefined,
) =>
  ({
    type: 'SET-ADD-DATA',
    current,
    daily,
    timezone,
    id,
    country,
  } as const);

export type AddActionType = ReturnType<typeof addDataAC>;

export const deleteCityAC = (id: string) =>
  ({
    type: 'DELETE-CITY',
    id,
  } as const);

export type DeleteCityActionType = ReturnType<typeof deleteCityAC>;

export const getDataFromLocationAC = () =>
  ({
    type: 'GET-DATA-FROM-LOCATION',
  } as const);

export type GetDataFromLocationActionType = ReturnType<typeof getDataFromLocationAC>;

export const additionalTC =
  (lat: number, lon: number, id: string, countryID?: string) => (dispatch: Dispatch) => {
    dataAPI.getDataFromCall(lat, lon).then(res => {
      dispatch(
        addDataAC(res.data.current, res.data.daily, res.data.timezone, id, countryID),
      );
    });
  };

export const getDataByCityNameTC =
  (
    name: string,
    lat: number,
    lon: number,
    countryID?: string,
  ): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
  dispatch => {
    const id: string = v1();
    dataAPI
      .getDataFromParams(lat, lon)
      .then(res => {
        handleThunk(
          dispatch,
          name,
          res.data.coord.lat,
          res.data.coord.lon,
          res.data.main,
          id,
        );
        // dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id));
        dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id, countryID));
      })
      .catch(err => {
        utilsError(err, dispatch);
      });
  };

export const getDataByLocationTC =
  (lat: number, lon: number): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
  dispatch => {
    const id: string = v1();
    dataAPI
      .getDataFromParams(lat, lon)
      .then(res => {
        handleThunk(
          dispatch,
          res.data.name,
          res.data.coord.lat,
          res.data.coord.lon,
          res.data.main,
          id,
        );
        dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id));
      })
      .catch(err => {
        utilsError(err, dispatch);
      });
  };

export const getDataByZipCodeTC =
  (
    zip: string,
    code: string,
  ): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
  dispatch => {
    const id: string = v1();
    dataAPI
      .getDataFromZip(zip, code)
      .then(res => {
        handleThunk(
          dispatch,
          res.data.name,
          res.data.coord.lat,
          res.data.coord.lon,
          res.data.main,
          id,
        );
        dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id));
      })
      .catch(err => {
        utilsError(err, dispatch);
      });
  };

export const getDataByInputNameTC =
  (name: string): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
  dispatch => {
    const id: string = v1();
    dataAPI
      .getDataByCityName(name)
      .then(res => {
        handleThunk(
          dispatch,
          res.data.name,
          res.data.coord.lat,
          res.data.coord.lon,
          res.data.main,
          id,
        );
        // dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id));
        dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id));
      })
      .catch(err => {
        utilsError(err, dispatch);
      });
  };

// export const additionalTC =
//   (lat: number, lon: number, id: string, countryID?: string) =>
//   async (dispatch: Dispatch) => {
//     try {
//       const res = await dataAPI.getDataFromCall(lat, lon);
//       dispatch(
//         addDataAC(res.data.current, res.data.daily, res.data.timezone, id, countryID),
//       );
//     } catch (e) {
//       console.log(e);
//     }
//   };
//
// export const getDataByCityNameTC =
//   (
//     name: string,
//     lat: number,
//     lon: number,
//     countryID?: string,
//   ): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
//   async dispatch => {
//     const id: string = v1();
//     try {
//       const res = await dataAPI.getDataFromParams(lat, lon);
//       handleThunk(
//         dispatch,
//         name,
//         res.data.coord.lat,
//         res.data.coord.lon,
//         res.data.main,
//         id,
//       );
//       await dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id, countryID));
//     } catch (err) {
//       utilsError(err, dispatch);
//     }
//   };
//
// export const getDataByLocationTC =
//   (lat: number, lon: number): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
//   async dispatch => {
//     const id: string = v1();
//     try {
//       const res = await dataAPI.getDataFromParams(lat, lon);
//       handleThunk(
//         dispatch,
//         res.data.name,
//         res.data.coord.lat,
//         res.data.coord.lon,
//         res.data.main,
//         id,
//       );
//       dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id));
//     } catch (err) {
//       utilsError(err, dispatch);
//     }
//   };
//
// export const getDataByZipCodeTC =
//   (
//     zip: string,
//     code: string,
//   ): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
//   async dispatch => {
//     const id: string = v1();
//
//     try {
//       const res = await dataAPI.getDataFromZip(zip, code);
//       handleThunk(
//         dispatch,
//         res.data.name,
//         res.data.coord.lat,
//         res.data.coord.lon,
//         res.data.main,
//         id,
//       );
//       dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id));
//     } catch (err) {
//       utilsError(err, dispatch);
//     }
//   };
//
// export const getDataByInputNameTC =
//   (name: string): ThunkAction<void, AppRootStateType, unknown, ActionsType> =>
//   async dispatch => {
//     const id: string = v1();
//     try {
//       const res = await dataAPI.getDataByCityName(name);
//       handleThunk(
//         dispatch,
//         res.data.name,
//         res.data.coord.lat,
//         res.data.coord.lon,
//         res.data.main,
//         id,
//       );
//       dispatch(additionalTC(res.data.coord.lat, res.data.coord.lon, id));
//     } catch (err) {
//       utilsError(err, dispatch);
//     }
//   };
