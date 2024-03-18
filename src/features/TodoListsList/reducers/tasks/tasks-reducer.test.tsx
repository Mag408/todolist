import {
  addTaskAC,
  removeTaskAC,
  setTasksAC,
  tasksReducer,
  updateTaskAC,
} from "./tasks-reducer";
import { TaskStateType } from "../../ToddoListsList";
import {
  addTodoListAC,
  removeTodoListAC,
  setTodoListsAC,
} from "../todoList/todoList-reducer";
import { TaskStatuses } from "../../../../api/todoLists-api";

const startState: TaskStateType = {
  todoListId1: [
    {
      description: "",
      title: "html",
      status: TaskStatuses.Completed,
      priority: 0,
      startDate: "",
      deadline: "",
      id: "1",
      todoListId: "todoListId1",
      order: 0,
      addedDate: "",
    },
    {
      description: "",
      title: "js",
      status: TaskStatuses.New,
      priority: 0,
      startDate: "",
      deadline: "",
      id: "2",
      todoListId: "todoListId1",
      order: 0,
      addedDate: "",
    },
    {
      description: "",
      title: "react",
      status: TaskStatuses.Completed,
      priority: 0,
      startDate: "",
      deadline: "",
      id: "3",
      todoListId: "todoListId1",
      order: 0,
      addedDate: "",
    },
  ],
  todoListId2: [
    {
      description: "",
      title: "bread",
      status: TaskStatuses.New,
      priority: 0,
      startDate: "",
      deadline: "",
      id: "1",
      todoListId: "todoListId2",
      order: 0,
      addedDate: "",
    },
    {
      description: "",
      title: "milk",
      status: TaskStatuses.Completed,
      priority: 0,
      startDate: "",
      deadline: "",
      id: "2",
      todoListId: "todoListId2",
      order: 0,
      addedDate: "",
    },
    {
      description: "",
      title: "tea",
      status: TaskStatuses.New,
      priority: 0,
      startDate: "",
      deadline: "",
      id: "3",
      todoListId: "todoListId2",
      order: 0,
      addedDate: "",
    },
  ],
};

test("correct task should be deleted from correct array", () => {
  const action = removeTaskAC({ taskId: "2", todoListId: "todoListId2" });

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todoListId1: [
      {
        description: "",
        title: "html",
        status: TaskStatuses.Completed,
        priority: 0,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
      },
      {
        description: "",
        title: "js",
        status: TaskStatuses.New,
        priority: 0,
        startDate: "",
        deadline: "",
        id: "2",
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
      },
      {
        description: "",
        title: "react",
        status: TaskStatuses.Completed,
        priority: 0,
        startDate: "",
        deadline: "",
        id: "3",
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
      },
    ],
    todoListId2: [
      {
        description: "",
        title: "bread",
        status: TaskStatuses.New,
        priority: 0,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todoListId2",
        order: 0,
        addedDate: "",
      },
      {
        description: "",
        title: "tea",
        status: TaskStatuses.New,
        priority: 0,
        startDate: "",
        deadline: "",
        id: "3",
        todoListId: "todoListId2",
        order: 0,
        addedDate: "",
      },
    ],
  });
});

test("correct task should be added to correct array", () => {
  const newTask = {
    description: "",
    title: "butter",
    status: TaskStatuses.New,
    priority: 0,
    startDate: "",
    deadline: "",
    id: "3",
    todoListId: "todoListId2",
    order: 0,
    addedDate: "",
  };
  const action = addTaskAC({ task: newTask });

  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(4);
  expect(endState["todoListId2"][0].id).toBeDefined();
  expect(endState["todoListId2"][0].title).toBe("butter");
  expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
});

test("status of specified task should be changed", () => {
  const action = updateTaskAC({
    taskId: "2",
    model: { status: TaskStatuses.New },
    todoListId: "todoListId2",
  });

  const endState = tasksReducer(startState, action);

  expect(endState.todoListId2[1].status).toBe(TaskStatuses.New);
  expect(endState.todoListId1[1].status).toBe(TaskStatuses.New);
});

test("the title still needs to be changed", () => {
  const action = updateTaskAC({
    taskId: "3",
    model: { title: "coffe" },
    todoListId: "todoListId2",
  });

  const endState = tasksReducer(startState, action);

  expect(endState.todoListId2[2].title).toBe("coffe");
  expect(endState.todoListId1[2].title).toBe("react");
});

test("new property with new array should be added when new todoList is added", () => {
  const action = addTodoListAC({
    todoList: {
      id: "todo4",
      title: "newTodoListTitle",
      order: 0,
      addedDate: "",
    },
  });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todoListId1" && k != "todoListId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todoListId should be deleted", () => {
  const action = removeTodoListAC({ id: "todoListId2" });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todoListId2"]).not.toBeDefined();
});

test("empty arrays should be added when we set todoList", () => {
  const action = setTodoListsAC({
    todoLists: [
      { id: "1", title: "CSS", order: 0, addedDate: "" },
      { id: "2", title: "html", order: 0, addedDate: "" },
    ],
  });

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toStrictEqual([]);
  expect(endState["2"]).toStrictEqual([]);
});

test("tasks should be added for todoList", () => {
  const action = setTasksAC({
    tasks: startState["todoListId1"],
    todoListId: "todoListId1",
  });

  const endState = tasksReducer({ todoListId2: [], todoListId1: [] }, action);

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(0);
});
