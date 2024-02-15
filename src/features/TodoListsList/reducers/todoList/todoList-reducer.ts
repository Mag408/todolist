import { v1 } from "uuid";
import { TodoListType, todoListAPI } from "../../../../api/todoLists-api";
import { Dispatch } from "redux";
import {
  RequestStatusType,
  SetErrorACType,
  SetStatusACType,
  setStatusAC,
} from "../../../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../../../utils/error-utils";

// types
export type FilterValuesType = "all" | "completed" | "active";

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>;

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>;

export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>;

type ActionsType =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | SetTodoListsActionType
  | ReturnType<typeof changeTodoListFilterAC>
  | ReturnType<typeof changeTodoListTitleAC>
  | ReturnType<typeof changeTodoListEntityStatusAC>;

type TuhnkDisparchType = ActionsType | SetStatusACType | SetErrorACType;

export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

//reducer
export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: TodoListDomainType[] = [];

export const todoListReducer = (
  state: TodoListDomainType[] = initialState,
  action: ActionsType
): TodoListDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.id);
    case "ADD-TODOLIST":
      return [
        { ...action.todoList, filter: "all", entityStatus: "idle" },
        ...state,
      ];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, entityStatus: action.status } : tl
      );
    }
    case "SET-TODOLISTS":
      return action.todoLists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    default:
      return state;
  }
};

//actions
export const removeTodoListAC = (todoListId: string) => {
  return { type: "REMOVE-TODOLIST", id: todoListId } as const;
};

export const addTodoListAC = (todoList: TodoListType) => {
  return { type: "ADD-TODOLIST", todoList } as const;
};

export const changeTodoListTitleAC = (
  newTodoListTitle: string,
  todoListId: string
) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: todoListId,
    title: newTodoListTitle,
  } as const;
};

export const changeTodoListFilterAC = (
  todoListId: string,
  newFilter: "all" | "completed" | "active"
) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: todoListId,
    filter: newFilter,
  } as const;
};

export const changeTodoListEntityStatusAC = (
  id: string,
  status: RequestStatusType
) => {
  return { type: "CHANGE-TODOLIST-ENTITY-STATUS", id, status } as const;
};

export const setTodoListsAC = (todoLists: TodoListType[]) => {
  return { type: "SET-TODOLISTS", todoLists } as const;
};

//thunk
export const fetchTodoListsThunk = (dispatch: Dispatch<TuhnkDisparchType>) => {
  dispatch(setStatusAC("loading"));
  todoListAPI
    .getTodoLists()
    .then((res) => {
      dispatch(setTodoListsAC(res.data));
      dispatch(setStatusAC("succeeded"));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const fetchTodoListsTC = () => {
  return (dispatch: Dispatch<TuhnkDisparchType>) => {
    dispatch(setStatusAC("loading"));
    todoListAPI
      .getTodoLists()
      .then((res) => {
        dispatch(setTodoListsAC(res.data));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const removeTodoListTC = (todoListId: string) => {
  return (dispatch: Dispatch<TuhnkDisparchType>) => {
    dispatch(setStatusAC("loading"));
    dispatch(changeTodoListEntityStatusAC(todoListId, "loading"));
    todoListAPI
      .deleteTodoList(todoListId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = removeTodoListAC(todoListId);
          dispatch(action);
          dispatch(setStatusAC("succeeded"));
          dispatch(changeTodoListEntityStatusAC(todoListId, "succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const createTodoListTC = (title: string) => {
  return (dispatch: Dispatch<TuhnkDisparchType>) => {
    dispatch(setStatusAC("loading"));
    todoListAPI
      .createTodoList(title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = addTodoListAC(res.data.data.item);
          dispatch(action);
          dispatch(setStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const changeTodoListTitleTC = (newTitle: string, todoListId: string) => {
  return (dispatch: Dispatch<TuhnkDisparchType>) => {
    dispatch(setStatusAC("loading"));
    todoListAPI
      .updateTodoListTitle(todoListId, newTitle)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = changeTodoListTitleAC(newTitle, todoListId);
          dispatch(action);
          dispatch(setStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
