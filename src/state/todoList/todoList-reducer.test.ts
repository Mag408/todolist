import { useState } from "react";
import { v1 } from "uuid";
import { TodoListType } from "../../App";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListReducer,
} from "./todoList-reducer";

test("user reducer should increment only age", () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "active" },
  ];
  const endState = todoListReducer(startState, removeTodoListAC(todoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("correct todolist should be added", () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const newTodoListTitle = "New todolist";

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "active" },
  ];

  const endState = todoListReducer(startState, addTodoListAC(newTodoListTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].filter).toBe("all");
  expect(endState[2].title).toBe(newTodoListTitle);
});

test("correct todolist should change its name", () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const newTodolistTitle = "New todolist";

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "active" },
  ];

  const endState = todoListReducer(
    startState,
    changeTodoListTitleAC(newTodolistTitle, todoListId2)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const newFilter = "completed";

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "active" },
  ];

  const endState = todoListReducer(
    startState,
    changeTodoListFilterAC(todoListId2, newFilter)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
