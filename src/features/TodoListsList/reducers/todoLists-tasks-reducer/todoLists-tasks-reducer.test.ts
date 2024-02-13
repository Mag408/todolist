import { TaskStateType } from "../../ToddoListsList";
import { tasksReducer } from "../tasks/tasks-reducer";
import {
  TodoListDomainType,
  addTodoListAC,
  todoListReducer,
} from "../todoList/todoList-reducer";

test("ids should be equals", () => {
  const startTasksState: TaskStateType = {};
  const startTodoListsState: Array<TodoListDomainType> = [];

  const action = addTodoListAC({
    id: "todo4",
    title: "newTodoListTitle",
    order: 0,
    addedDate: "",
  });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodoListsState = todoListReducer(startTodoListsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListsState[0].id;

  expect(idFromTasks).toBe(action.todoList.id);
  expect(idFromTodoLists).toBe(action.todoList.id);
});
