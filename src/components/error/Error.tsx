import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import icon from '../../images/error.svg';
import { setErrorAC } from '../../state/errorReducer';
import { AppRootStateType } from '../../state/store';

import style from './Error.module.scss';

export const Error = React.memo(() => {
  const error = useSelector<AppRootStateType, string[]>(state => state.errorReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setErrorAC(null));
    }, 6000);
  }, [error]);

  const handleClose = (): void => {
    dispatch(setErrorAC(null));
  };

  const errArray = Array.from(new Set(error));

  return (
    <div className={style.main}>
      {errArray?.map((message: string) => (
        <div key={message} className={style.wrapper}>
          <div className={style.image}>
            <img className={style.icon} src={icon} alt="" />
          </div>
          <div className={style.text}>{message[0].toUpperCase() + message.slice(1)}</div>
          <button
            className={style.closed}
            onClick={handleClose}
            type="button"
            aria-label=" "
          />
        </div>
      ))}
    </div>
  );
});
