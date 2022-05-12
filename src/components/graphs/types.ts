import { DataWeatherType } from '../../types/types';

export type DataType = {
  name: string;
  [key: string]: number | string;
};

export type GraphsPropsType = {
  city: DataWeatherType;
};
