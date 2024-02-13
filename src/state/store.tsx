import { applyMiddleware, combineReducers, createStore } from "redux";
import { tasksReducer } from "../features/TodoListsList/reducers/tasks/tasks-reducer";
import { todoListReducer } from "../features/TodoListsList/reducers/todoList/todoList-reducer";
import { thunk } from "redux-thunk";
import { appReducer } from "../app/app-reducer";

const rootReducer = combineReducers({
  todoList: todoListReducer,
  tasks: tasksReducer,
  app: appReducer,
});
//@ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk));

//export const store = configureStore({reducer: rootReducer});
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
