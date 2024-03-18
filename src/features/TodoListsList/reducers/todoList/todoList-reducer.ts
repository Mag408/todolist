import { TodoListType, todoListAPI } from "../../../../api/todoLists-api";
import { Dispatch } from "redux";
import { RequestStatusType, setStatusAC } from "../../../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../../../utils/error-utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// types
export type FilterValuesType = "all" | "completed" | "active";

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>;

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>;

export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>;

export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

//reducer

const initialState: TodoListDomainType[] = [];

const todoListSlice = createSlice({
  name: "todoList",
  initialState: initialState,
  reducers: {
    removeTodoListAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    addTodoListAC(state, action: PayloadAction<{ todoList: TodoListType }>) {
      state.unshift({
        ...action.payload.todoList,
        filter: "all",
        entityStatus: "idle",
      });
    },
    changeTodoListTitleAC(
      state,
      action: PayloadAction<{ newTodoListTitle: string; id: string }>
    ) {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.newTodoListTitle;
      }
    },
    changeTodoListEntityStatusAC(
      state,
      action: PayloadAction<{ id: string; status: RequestStatusType }>
    ) {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.entityStatus = action.payload.status;
      }
    },
    changeTodoListFilterAC(
      state,
      action: PayloadAction<{
        id: string;
        newFilter: "all" | "completed" | "active";
      }>
    ) {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.filter = action.payload.newFilter;
      }
    },
    setTodoListsAC(
      state,
      action: PayloadAction<{ todoLists: TodoListType[] }>
    ) {
      return action.payload.todoLists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    },
  },
});

export const todoListReducer = todoListSlice.reducer;
export const {
  removeTodoListAC,
  addTodoListAC,
  changeTodoListTitleAC,
  changeTodoListEntityStatusAC,
  changeTodoListFilterAC,
  setTodoListsAC,
} = todoListSlice.actions;

//thunk
export const fetchTodoListsThunk = (dispatch: Dispatch) => {
  dispatch(setStatusAC({ status: "loading" }));
  todoListAPI
    .getTodoLists()
    .then((res) => {
      dispatch(setTodoListsAC({ todoLists: res.data }));
      dispatch(setStatusAC({ status: "succeeded" }));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const fetchTodoListsTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    todoListAPI
      .getTodoLists()
      .then((res) => {
        dispatch(setTodoListsAC({ todoLists: res.data }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const removeTodoListTC = (todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    dispatch(
      changeTodoListEntityStatusAC({ id: todoListId, status: "loading" })
    );
    todoListAPI
      .deleteTodoList(todoListId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = removeTodoListAC({ id: todoListId });
          dispatch(action);
          dispatch(setStatusAC({ status: "succeeded" }));
          dispatch(
            changeTodoListEntityStatusAC({
              id: todoListId,
              status: "succeeded",
            })
          );
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
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    todoListAPI
      .createTodoList(title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = addTodoListAC({ todoList: res.data.data.item });
          dispatch(action);
          dispatch(setStatusAC({ status: "succeeded" }));
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
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    todoListAPI
      .updateTodoListTitle(todoListId, newTitle)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = changeTodoListTitleAC({
            newTodoListTitle: newTitle,
            id: todoListId,
          });
          dispatch(action);
          dispatch(setStatusAC({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
