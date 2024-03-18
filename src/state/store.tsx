import { combineReducers } from "redux";
import { tasksReducer } from "../features/TodoListsList/reducers/tasks/tasks-reducer";
import { todoListReducer } from "../features/TodoListsList/reducers/todoList/todoList-reducer";
import { thunk } from "redux-thunk";
import { appReducer } from "../app/app-reducer";
import { loginReducer } from "../features/Loign/login-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  todoList: todoListReducer,
  tasks: tasksReducer,
  app: appReducer,
  login: loginReducer,
});
// export const store = createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
