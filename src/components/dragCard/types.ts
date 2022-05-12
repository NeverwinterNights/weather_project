import { DataWeatherType } from '../../state/dataReducer';

export type DragCardPropsType = {
  id: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  city: DataWeatherType;
};

export type DragItemType = {
  index: number;
  id: string;
  type: string;
};
