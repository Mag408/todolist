import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks/tasks-reducer";
import { todoListReducer } from "./todoList/todoList-reducer";

const rootReducer = combineReducers({
  todolist: todoListReducer,
  tasks: tasksReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
