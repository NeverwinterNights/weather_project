import React, { KeyboardEvent } from 'react';

import style from '../../slide/slideMenu/SlideMenu.module.scss';

import { ClosedPropsType } from './types';

export const CloseMenu = React.memo(({ closedFavoritesHandler }: ClosedPropsType) => {
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      closedFavoritesHandler(false);
    }
  };
  return (
    <div
      role="button"
      tabIndex={0}
      title="Close Slide"
      onKeyPress={onKeyPressHandler}
      onClick={() => {
        closedFavoritesHandler(false);
      }}
      className={style.icon}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25px"
        height="25px"
        viewBox="0 0 512 512"
        fill="white"
      >
        <path d="M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z" />
      </svg>
    </div>
  );
});
