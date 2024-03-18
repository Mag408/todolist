import { Dispatch } from "redux";
import { authAPI } from "../api/todoLists-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/error-utils";
import { setIsLoggedInAC } from "../features/Loign/login-reducer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setErrorAC(state, action: PayloadAction<{ errorMessage: string | null }>) {
      state.error = action.payload.errorMessage;
    },
    setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value;
    },
  },
});

export const appReducer = appSlice.reducer;
export const { setStatusAC, setErrorAC, setAppInitializedAC } =
  appSlice.actions;

export type SetErrorACType = ReturnType<typeof setErrorAC>;
export type SetStatusACType = ReturnType<typeof setStatusAC>;
export type SetAppInitializedACType = ReturnType<typeof setAppInitializedAC>;

// thunks

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setStatusAC({ status: "loading" }));
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }));
        dispatch(setAppInitializedAC({ value: true }));
      } else {
      }
      dispatch(setAppInitializedAC({ value: true }));
      dispatch(setStatusAC({ status: "succeeded" }));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
