import React, { useRef } from 'react';

import { Identifier, XYCoord } from 'dnd-core';
import { useDrag, useDrop } from 'react-dnd';

import { DataWeatherType } from '../../state/dataReducer';
import { Card } from '../card/Card';

type DragCardPropsType = {
  id: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  city: DataWeatherType;
};

type DragItemType = {
  index: number;
  id: string;
  type: string;
};

export const ItemTypes = {
  CARD: 'card',
};
export const DragCard = React.memo(({ id, moveCard, index, city }: DragCardPropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  const style = {
    // border: '1px dashed gray',
    // padding: '0.5rem 1rem',
    // marginBottom: '.5rem',
    // backgroundColor: 'white',
    // cursor: 'move',
  };

  const [{ handlerId }, drop] = useDrop<
    DragItemType,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItemType, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ id, index }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      <Card city={city} />
    </div>
  );
});
