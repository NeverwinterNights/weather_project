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
