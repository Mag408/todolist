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

export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: TodoListType[] = [
  { id: todoListId1, title: "What to learn", filter: "all" },
  { id: todoListId2, title: "What to buy", filter: "active" },
];

export const todoListReducer = (
  state: TodoListType[] = initialState,
  action: ActionsType
): TodoListType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      const removedArray = state.filter((v) => v.id !== action.id);

      return removedArray;
    case "ADD-TODOLIST":
      return [
        {
          id: action.id,
          title: action.title,
          filter: "all",
        },
        ...state,
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
      return state;
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
  todoListId: string
): ChangeTodoListTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: todoListId,
    title: newTodoListTitle,
  };
};

export const changeTodoListFilterAC = (
  todoListId: string,
  newFilter: "all" | "completed" | "active"
): ChangeTodoListFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: todoListId, filter: newFilter };
};
