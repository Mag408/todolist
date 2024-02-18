import { Provider } from "react-redux";
import { AppRootStateType, store } from "../state/store";
import { combineReducers, createStore } from "redux";
import { tasksReducer } from "../features/TodoListsList/reducers/tasks/tasks-reducer";
import { todoListReducer } from "../features/TodoListsList/reducers/todoList/todoList-reducer";
import { appReducer } from "../app/app-reducer";
import { TaskPriorities, TaskStatuses } from "../api/todoLists-api";
import { v1 } from "uuid";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoList: todoListReducer,
  app: appReducer,
});

const initialGlobalState: AppRootStateType = {
  todoList: [
    {
      id: "todoListId1",
      title: "tifi",
      filter: "all",
      entityStatus: "idle",
      addedDate: "",
      order: 0,
    },
    {
      id: "todoListId2",
      title: "tifi2",
      filter: "all",
      entityStatus: "idle",
      addedDate: "",
      order: 0,
    },
  ],
  tasks: {
    ["todoListId1"]: [
      {
        description: "",
        title: "t1",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: v1(),
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
      },
      {
        description: "",
        title: "t2",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: v1(),
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
      },
    ],
    ["todoListId2"]: [
      {
        description: "",
        title: "t1",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: v1(),
        todoListId: "todoListId2",
        order: 0,
        addedDate: "",
      },
      {
        description: "",
        title: "t2",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: v1(),
        todoListId: "todoListId2",
        order: 0,
        addedDate: "",
      },
    ],
  },
  app: {
    error: null,
    status: "idle",
    isInitialized: false,
  },
  login: {
    isLoggedIn: false,
  },
};

export const storyBookStore = createStore(rootReducer);

export const ReduxStoreProviderDecorator = (story: any) => {
  return <Provider store={store}> {story()} </Provider>;
};
