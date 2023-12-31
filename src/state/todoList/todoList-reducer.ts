import { v1 } from "uuid";
import { TodoListType } from "../../App";

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodoListActionType = {
  type: "ADD-TODOLIST";
  title: string;
  id: string;
};

export type ChangeTodoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: "all" | "completed" | "active";
};

type ActionsType =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType;

export const todoListReducer = (
  state: TodoListType[],
  action: ActionsType
): TodoListType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      const removedArray = state.filter((v) => v.id !== action.id);

      return removedArray;
    case "ADD-TODOLIST":
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          filter: "all",
        },
      ];
    case "CHANGE-TODOLIST-TITLE":
      const todolistT = state.find((v) => v.id === action.id);
      if (todolistT) {
        todolistT.title = action.title;
      }
      return [...state];
    case "CHANGE-TODOLIST-FILTER":
      const todolistf = state.find((v) => v.id === action.id);
      if (todolistf) {
        todolistf.filter = action.filter;
      }
      return [...state];
    default:
      throw new Error("I don't understand this action type");
  }
};

export const removeTodoListAC = (
  todoListId: string
): RemoveTodoListActionType => {
  return { type: "REMOVE-TODOLIST", id: todoListId };
};

export const addTodoListAC = (
  newTodoListTitle: string
): AddTodoListActionType => {
  return { type: "ADD-TODOLIST", title: newTodoListTitle, id: v1() };
};

export const changeTodoListTitleAC = (
  newTodoListTitle: string,
  todoListId2: string
): ChangeTodoListTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: todoListId2,
    title: newTodoListTitle,
  };
};

export const changeTodoListFilterAC = (
  todoListId2: string,
  newFilter: "all" | "completed" | "active"
): ChangeTodoListFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: todoListId2, filter: newFilter };
};
