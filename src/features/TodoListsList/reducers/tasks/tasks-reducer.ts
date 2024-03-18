import {
  AddTodoListActionType,
  RemoveTodoListActionType,
  SetTodoListsActionType,
  addTodoListAC,
  removeTodoListAC,
  setTodoListsAC,
} from "../todoList/todoList-reducer";
import { TaskStateType } from "../../ToddoListsList";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  TodoListType,
  UpdateTaskModelType,
  todoListAPI,
} from "../../../../api/todoLists-api";
import { Dispatch } from "redux";
import {
  SetErrorACType,
  SetStatusACType,
  setStatusAC,
} from "../../../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../../../utils/error-utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

const initialState: TaskStateType = {};

const tasksSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    removeTaskAC(
      state,
      action: PayloadAction<{ taskId: string; todoListId: string }>
    ) {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) tasks.splice(index, 1);
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        taskId: string;
        model: UpdateDomainTaskModelType;
        todoListId: string;
      }>
    ) {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    setTasksAC(
      state,
      action: PayloadAction<{ tasks: TaskType[]; todoListId: string }>
    ) {
      state[action.payload.todoListId] = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoListAC, (state, action) => {
        state[action.payload.todoList.id] = [];
      })
      .addCase(removeTodoListAC, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(setTodoListsAC, (state, action) => {
        action.payload.todoLists.forEach((tl) => {
          state[tl.id] = [];
        });
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { removeTaskAC, addTaskAC, updateTaskAC, setTasksAC } =
  tasksSlice.actions;

// thunks
export const fetchTasksTC = (todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    todoListAPI.getTasks(todoListId).then((res) => {
      const action = setTasksAC({
        tasks: res.data.items,
        todoListId: todoListId,
      });
      dispatch(action);
      dispatch(setStatusAC({ status: "succeeded" }));
    });
  };
};

export const removeTaskTC = (taskId: string, todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    todoListAPI
      .deleteTask(todoListId, taskId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeTaskAC({ taskId: taskId, todoListId: todoListId }));
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

export const addTaskTC = (taskText: string, todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    todoListAPI
      .createTask(todoListId, taskText)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = addTaskAC({ task: res.data.data.item });
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

export const updateTaskTC = (
  task: TaskType,
  domainModail: UpdateDomainTaskModelType
) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: "loading" }));
    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.addedDate,
      deadline: task.deadline,
      ...domainModail,
    };

    todoListAPI
      .updateTask(task.todoListId, task.id, {
        ...apiModel,
      })
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = updateTaskAC({
            taskId: task.id,
            model: apiModel,
            todoListId: task.todoListId,
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
