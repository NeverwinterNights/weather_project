import React, { useEffect, useState } from 'react';

import themes from '../../../theme/schema';

import style from './Toggle.module.scss';

type TogglePropsType = {
  themeHandler?: (value: boolean) => void;
  temperatureTypeChanger?: () => void;
};

export const Toggle: React.FC<TogglePropsType> = React.memo(
  ({ temperatureTypeChanger, themeHandler }) => {
    const [ready, setReady] = useState<boolean>(false);
    const onClickToggleHandler = (): void => {
      if (themeHandler) themeHandler(ready);
      if (temperatureTypeChanger) temperatureTypeChanger();
      setReady(!ready);
    };
    useEffect(() => {
      const localValue = localStorage.getItem('current-theme');
      if (
        localValue &&
        themeHandler &&
        JSON.parse(localValue).name === themes.data.Light.name
      ) {
        setReady(false);
      } else {
        setReady(true);
      }
      if (temperatureTypeChanger) {
        setReady(false);
      }
    }, []);

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
        >
          <input type="checkbox" />
        </div>
      </div>
    );
  },
);
