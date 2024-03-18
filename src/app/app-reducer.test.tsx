import {
  appReducer,
  initialStateType,
  setErrorAC,
  setStatusAC,
} from "./app-reducer";

let statrState: initialStateType;

beforeEach(() => {
  statrState = {
    error: null,
    status: "idle",
    isInitialized: false,
  };
});

test("correct status should be set", () => {
  const endState = appReducer(statrState, setStatusAC({ status: "loading" }));

  expect(endState.status).toBe("loading");
});

test("correct error message should be set", () => {
  const endState = appReducer(
    statrState,
    setErrorAC({ errorMessage: "some error" })
  );

  expect(endState.error).toBe("some error");
});
