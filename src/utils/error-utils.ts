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
    dispatch(setErrorAC(data.messages[0]));
    dispatch(setStatusAC("failed"));
  } else {
    dispatch(setErrorAC("some error occurred"));
    dispatch(setStatusAC("failed"));
  }
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch<SetStatusACType | SetErrorACType>
) => {
  dispatch(setErrorAC(error.message));
  dispatch(setStatusAC("failed"));
};
