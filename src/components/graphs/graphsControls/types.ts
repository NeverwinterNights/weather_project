export type GraphsControlsPropsType = {
  sendCityHintsRequest: (name: string) => void;
  value: string;
  setValue: (value: string) => void;
};

export type GraphsButtonType = 'temperature' | 'pressure' | 'humidity';
