import axios from "axios";

// types
export type TodoListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type GetTasksRespons = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "057859b6-03b9-43df-8369-90a969a06c40",
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

// api
export const todoListAPI = {
  getTodoLists() {
    return instance.get<TodoListType[]>("todo-lists");
  },
  createTodoList(title: string) {
    return instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", {
      title,
    });
  },
  deleteTodoList(todoListId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}`);
  },
  updateTodoListTitle(todoListId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todoListId}`, {
      title,
    });
  },
  getTasks(todoListId: string) {
    return instance.get<GetTasksRespons>(`todo-lists/${todoListId}/tasks`);
  },
  createTask(todoListId: string, taskText: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todoListId}/tasks`,
      { title: taskText }
    );
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todoListId}/tasks/${taskId}`
    );
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(
      `/todo-lists/${todoListId}/tasks/${taskId}`,
      model
    );
  },
};
