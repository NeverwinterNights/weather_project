export const changeTemp = (type: boolean, value: number): number => {
  if (!type) {
    return (value * 9) / 5 + 32;
  }
  return value;
};
