import { Dispatch } from "redux";
import { authAPI } from "../api/todoLists-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/error-utils";
import { setIsLoggedInAC } from "../features/Loign/login-reducer";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type initialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

const initialState: initialStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
};

export type SetErrorACType = ReturnType<typeof setErrorAC>;
export type SetStatusACType = ReturnType<typeof setStatusAC>;
export type SetAppInitializedACType = ReturnType<typeof setAppInitializedAC>;

type ActionsType = SetStatusACType | SetErrorACType | SetAppInitializedACType;

type InitialStateType = typeof initialState;

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.errorMessage };
    case "APP/SET-IS-INITIALIZED":
      return { ...state, isInitialized: action.value };
    default:
      return state;
  }
};

export const setStatusAC = (status: RequestStatusType) => {
  return {
    type: "APP/SET-STATUS",
    status,
  } as const;
};

export const setErrorAC = (errorMessage: string | null) => {
  return {
    type: "APP/SET-ERROR",
    errorMessage,
  } as const;
};

export const setAppInitializedAC = (value: boolean) => {
  return {
    type: "APP/SET-IS-INITIALIZED",
    value,
  } as const;
};

// thunks

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppInitializedAC(true));
      } else {
      }
      dispatch(setAppInitializedAC(true));
      dispatch(setStatusAC("succeeded"));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
