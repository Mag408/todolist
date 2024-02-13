import { v1 } from "uuid";
import {
  TodoListDomainType,
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  setTodoListsAC,
  todoListReducer,
} from "./todoList-reducer";

const todoListId1 = v1();
const todoListId2 = v1();

const initialState: Array<TodoListDomainType> = [
  {
    id: todoListId1,
    title: "What to learn",
    filter: "all",
    order: 0,
    addedDate: "",
    entityStatus: "idle",
  },
  {
    id: todoListId2,
    title: "What to buy",
    filter: "all",
    order: 0,
    addedDate: "",
    entityStatus: "idle",
  },
];

test("user reducer should increment only age", () => {
  const endState = todoListReducer(initialState, removeTodoListAC(todoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("correct todoList should be added", () => {
  const newTodoListTitle = "New todoList";

  const endState = todoListReducer(
    initialState,
    addTodoListAC({
      id: "testTodoListId",
      title: newTodoListTitle,
      order: 0,
      addedDate: "",
    })
  );

  expect(endState.length).toBe(3);
  expect(endState[0].filter).toBe("all");
  expect(endState[0].title).toBe(newTodoListTitle);
  expect(endState[0].id).toBeDefined();
});

test("correct todoList should change its name", () => {
  const newTodoListTitle = "new todoList";

  const endState = todoListReducer(
    initialState,
    changeTodoListTitleAC(newTodoListTitle, todoListId2)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodoListTitle);
});

test("correct filter of todoList should be changed", () => {
  const newFilter = "completed";

  const endState = todoListReducer(
    initialState,
    changeTodoListFilterAC(todoListId2, newFilter)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test("todoLists should be set to the state", () => {
  const endState = todoListReducer([], setTodoListsAC(initialState));

  expect(endState.length).toBe(2);
  expect(endState[1].id).toBe(todoListId2);
});
