import { DataWeatherType } from '../../state/dataReducer';

export type WeekCardPropsType = {
  city: DataWeatherType;
  selectedTempType: string;
};
