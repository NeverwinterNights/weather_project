import React, { useState } from 'react';

import style from './Toggle.module.scss';

type TogglePropsType = {
  themeHandler?: () => void;
};

export const Toggle: React.FC<TogglePropsType> = React.memo(({ themeHandler }) => {
  const [ready, setReady] = useState<boolean>(false);
  const onClickToggleHandler = (): void => {
    if (themeHandler) themeHandler();
    setReady(!ready);
  };
  const onKeyToggleHandler = (): void => {
    setReady(!ready);
  };

  return (
    <div className={style.wrapper}>
      <div
        onKeyPress={onKeyToggleHandler}
        tabIndex={0}
        role="button"
        onClick={onClickToggleHandler}
        className={`${style.checkbox} ${ready ? style.active : ''}`}
        // className={style.checkbox}
      >
        <input type="checkbox" name="namecheckbox_1" />
      </div>
    </div>
  );
});
