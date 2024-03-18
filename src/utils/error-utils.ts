import { Dispatch } from "redux";
import { ResponseType } from "../api/todoLists-api";
import {
  SetErrorACType,
  SetStatusACType,
  setErrorAC,
  setStatusAC,
} from "../app/app-reducer";

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch<SetStatusACType | SetErrorACType>
) => {
  if (data.messages.length) {
    dispatch(setErrorAC({ errorMessage: data.messages[0] }));
    dispatch(setStatusAC({ status: "failed" }));
  } else {
    dispatch(setErrorAC({ errorMessage: "some error occurred" }));
    dispatch(setStatusAC({ status: "failed" }));
  }
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch<SetStatusACType | SetErrorACType>
) => {
  dispatch(
    setErrorAC(
      error.message
        ? { errorMessage: error.message }
        : { errorMessage: "some error occurred" }
    )
  );
  dispatch(setStatusAC({ status: "failed" }));
};
