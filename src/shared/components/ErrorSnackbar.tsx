import React from 'react';
import Alert from '@mui/material/Alert';
import { Close } from '@mui/icons-material';
import { IconButton, Snackbar } from '@mui/material';

interface ErrorSnackbarProps {
  error: string;
  handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ error, handleClose }) => {
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      {error !== "" && (
        <Snackbar open autoHideDuration={3000} action={action}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default ErrorSnackbar;
