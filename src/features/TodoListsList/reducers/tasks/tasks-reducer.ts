import {
  AddTodoListActionType,
  RemoveTodoListActionType,
  SetTodoListsActionType,
} from "../todoList/todoList-reducer";
import { TaskStateType } from "../../ToddoListsList";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
  todoListAPI,
} from "../../../../api/todoLists-api";
import { Dispatch } from "redux";
import {
  SetErrorACType,
  SetStatusACType,
  setErrorAC,
  setStatusAC,
} from "../../../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../../../utils/error-utils";

// types
type ActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | RemoveTodoListActionType
  | SetTodoListsActionType
  | AddTodoListActionType;

type TuhnkDisparchType = ActionType | SetStatusACType | SetErrorACType;

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

const initialState: TaskStateType = {};

export const tasksReducer = (
  state: TaskStateType = initialState,
  action: ActionType
): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(
          (t) => t.id !== action.taskId
        ),
      };
    case "ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };
    case "UPDATE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) =>
          t.id === action.taskId ? { ...t, ...action.model } : t
        ),
      };
    case "ADD-TODOLIST":
      return { ...state, [action.todoList.id]: [] };
    case "REMOVE-TODOLIST":
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    case "SET-TODOLISTS": {
      debugger;
      const copyState = { ...state };
      action.todoLists.forEach((tl) => {
        copyState[tl.id] = [];
      });
      return copyState;
    }
    case "SET-TASKS":
      debugger;
      return { ...state, [action.todoListId]: action.tasks };
    default:
      return state;
  }
};

// actions
export const removeTaskAC = (taskId: string, todoListId: string) => {
  return {
    type: "REMOVE-TASK",
    taskId: taskId,
    todoListId: todoListId,
  } as const;
};

export const addTaskAC = (task: TaskType) => {
  return { type: "ADD-TASK", task } as const;
};

export const updateTaskAC = (
  taskId: string,
  model: UpdateDomainTaskModelType,
  todoListId: string
) => {
  return {
    type: "UPDATE-TASK",
    taskId: taskId,
    model: model,
    todoListId: todoListId,
  } as const;
};

export const setTasksAC = (tasks: TaskType[], todoListId: string) => {
  return {
    type: "SET-TASKS",
    tasks,
    todoListId,
  } as const;
};

// thunks
export const fetchTasksTC = (todoListId: string) => {
  return (dispatch: Dispatch<TuhnkDisparchType>) => {
    dispatch(setStatusAC("loading"));
    todoListAPI.getTasks(todoListId).then((res) => {
      const action = setTasksAC(res.data.items, todoListId);
      dispatch(action);
      dispatch(setStatusAC("succeeded"));
    });
  };
};

export const removeTaskTC = (taskId: string, todoListId: string) => {
  return (dispatch: Dispatch<TuhnkDisparchType>) => {
    dispatch(setStatusAC("loading"));
    todoListAPI
      .deleteTask(todoListId, taskId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = removeTaskAC(taskId, todoListId);
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

export const addTaskTC = (taskText: string, todoListId: string) => {
  return (dispatch: Dispatch<TuhnkDisparchType>) => {
    dispatch(setStatusAC("loading"));
    todoListAPI
      .createTask(todoListId, taskText)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = addTaskAC(res.data.data.item);
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

export const updateTaskTC = (
  task: TaskType,
  domainModail: UpdateDomainTaskModelType
) => {
  return (dispatch: Dispatch<TuhnkDisparchType>) => {
    dispatch(setStatusAC("loading"));
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
          const action = updateTaskAC(task.id, apiModel, task.todoListId);
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
