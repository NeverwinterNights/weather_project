import React, { ReactElement } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';

import { setErrorAC } from '../../state/errorReducer';
import { AppRootStateType } from '../../state/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const ErrorSnackbar = (): ReactElement => {
  const error = useSelector<AppRootStateType, string | null>(
    state => state.errorReducer.error,
  );

  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setErrorAC(null));
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
