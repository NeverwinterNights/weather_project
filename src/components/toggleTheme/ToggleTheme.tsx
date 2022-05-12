import React, { KeyboardEvent, useEffect, useState } from 'react';

import themes from '../../../theme/schema';

import style from './ToggleTheme.module.scss';
import { TogglePropsType } from './types';

export const ToggleTheme: React.FC<TogglePropsType> = React.memo(
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

    const onKeyToggleHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        setReady(!ready);
      }
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
