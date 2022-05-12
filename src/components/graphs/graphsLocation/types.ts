import { CityType } from '../../../types/types';

export type GraphsLocationPropsType = {
  cityHints: CityType[];
  getQueryParams: (lat: number, lon: number) => void;
  setValue: (value: string) => void;
};
