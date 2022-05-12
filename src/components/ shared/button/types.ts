import { TypeSearchTypes } from '../../../types/types';

export type ButtonPropsType = {
  onClickHandler: (type: TypeSearchTypes) => void;
  label: string;
  value: TypeSearchTypes;
  clicked: TypeSearchTypes;
};
