import { DataWeatherType } from '../state/dataReducer';

export const changeTemp = (type: boolean, value: number): number => {
  if (!type) {
    return (value * 9) / 5 + 32;
  }
  return value;
};

export const randomColor = (): string =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const fromPascalToMM = (value: number): number =>
  Math.round((value / 133.3224) * 100);

export const nameToUppercase = (name: string): string =>
  name[0].toUpperCase() + name.slice(1);

export const conditionUtils = (
  data: DataWeatherType[],
  cityName: string,
  country?: string,
): boolean =>
  !!data.length &&
  !!data.filter(
    city => city.cityName === nameToUppercase(cityName) && city.country === country,
  ).length;
// city => city.cityName === nameToUppercase(cityName) && city.country === CountryName)[0];
