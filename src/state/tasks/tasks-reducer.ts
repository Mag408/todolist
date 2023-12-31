import { v1 } from "uuid";
import { TaskStateType } from "../../App";
import {
  AddTodoListActionType,
  RemoveTodoListActionType,
} from "../todoList/todoList-reducer";

type removeTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistId: string;
};

type addTaskACType = {
  type: "ADD-TASK";
  title: string;
  todolistId: string;
};

type changeTaskStatusACType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  value: boolean;
  todolistId: string;
};

type changeTaskTitleACType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  title: string;
  todolistId: string;
};

type ActionType =
  | removeTaskActionType
  | addTaskACType
  | changeTaskStatusACType
  | changeTaskTitleACType
  | AddTodoListActionType
  | RemoveTodoListActionType;

export const tasksReducer = (
  state: TaskStateType,
  action: ActionType
): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const copyState = state;
      const tasks = state[action.todolistId];
      const filterdTasks = tasks.filter((task) => action.taskId !== task.id);
      copyState[action.todolistId] = filterdTasks;
      return copyState;
    }
    case "ADD-TASK": {
      const copyState = { ...state };
      const newTask = { id: v1(), title: action.title, isDone: false };
      const tasks = [newTask, ...state[action.todolistId]];
      copyState[action.todolistId] = tasks;
      return copyState;
    }
    case "CHANGE-TASK-STATUS": {
      const copyState = { ...state };
      const foundTask = copyState[action.todolistId].find(
        (t) => t.id === action.taskId
      );
      if (foundTask) {
        foundTask.isDone = action.value;
      }
      return copyState;
    }
    case "CHANGE-TASK-TITLE": {
      const copyState = { ...state };
      const foundTask = copyState[action.todolistId].find(
        (t) => t.id === action.taskId
      );
      if (foundTask) {
        foundTask.title = action.title;
      }
      return copyState;
    }
    case "ADD-TODOLIST": {
      const copyState = { ...state };
      copyState[action.id] = [];
      return copyState;
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.id];

      return copyState;
    }
    default:
      throw new Error("I don't understand this action type");
  }
};
export const removeTaskAC = (
  taskId: string,
  todolistId: string
): removeTaskActionType => {
  return { type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId };
};

export const addTaskAC = (title: string, todolistId: string): addTaskACType => {
  return { type: "ADD-TASK", title: title, todolistId: todolistId };
};

export const changeTaskStatusAC = (
  taskId: string,
  value: boolean,
  todolistId: string
): changeTaskStatusACType => {
  return {
    type: "CHANGE-TASK-STATUS",
    taskId: taskId,
    value: value,
    todolistId: todolistId,
  };
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): changeTaskTitleACType => {
  return {
    type: "CHANGE-TASK-TITLE",
    taskId: taskId,
    title: title,
    todolistId: todolistId,
  };
};
