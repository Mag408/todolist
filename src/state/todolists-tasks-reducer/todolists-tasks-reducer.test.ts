import { TaskStateType, TodoListType } from "../../App";
import { tasksReducer } from "../tasks/tasks-reducer";
import { addTodoListAC, todoListReducer } from "../todoList/todoList-reducer";

test("ids should be equals", () => {
  const startTasksState: TaskStateType = {};
  const startTodolistsState: Array<TodoListType> = [];

  const action = addTodoListAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todoListReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.id);
  expect(idFromTodolists).toBe(action.id);
});
