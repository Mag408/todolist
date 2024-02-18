import { Dispatch } from "redux";
import {
  SetAppInitializedACType,
  SetErrorACType,
  SetStatusACType,
  setAppInitializedAC,
  setStatusAC,
} from "../../app/app-reducer";
import { LoginParamsType, authAPI } from "../../api/todoLists-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";

// types
type ActionType = ReturnType<typeof setIsLoggedInAC>;

type TuhnkDisparchType =
  | ActionType
  | SetStatusACType
  | SetErrorACType
  | SetAppInitializedACType;

type InitialStateType = {
  isLoggedIn: boolean;
};

const initialState: InitialStateType = {
  isLoggedIn: false,
};

export const loginReducer = (
  state = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return {
        ...state,
        isLoggedIn: action.value,
      };
    default:
      return state;
  }
};

// actions
export const setIsLoggedInAC = (value: boolean) => {
  return {
    type: "login/SET-IS-LOGGED-IN",
    value,
  } as const;
};

// thunks
export const loginTC =
  (data: LoginParamsType) => (dispatch: Dispatch<TuhnkDisparchType>) => {
    dispatch(setStatusAC("loading"));
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true));
          dispatch(setAppInitializedAC(true));
          dispatch(setStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const logoutTC = () => (dispatch: Dispatch<TuhnkDisparchType>) => {
  dispatch(setStatusAC("loading"));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(setAppInitializedAC(true));
        dispatch(setStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
