import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { useDispatch } from "react-redux";
import { setErrorAC } from "../../app/app-reducer";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ErrorSnackbar() {
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
  );
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setErrorAC({ errorMessage: null }));
  };

  const isOpen = error !== null;

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}
