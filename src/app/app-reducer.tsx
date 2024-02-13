export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type initialStateType = {
  status: RequestStatusType;
  error: string | null;
};

const initialState: initialStateType = {
  status: "idle",
  error: null,
};

export type SetErrorACType = ReturnType<typeof setErrorAC>;
export type SetStatusACType = ReturnType<typeof setStatusAC>;

type ActionsType = SetStatusACType | SetErrorACType;

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
