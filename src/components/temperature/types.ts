import { DataWeatherType } from '../../state/dataReducer';

export type WeatherCardPropsType = {
  city: DataWeatherType;
  selectedTempType: string;
};
