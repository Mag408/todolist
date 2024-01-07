import React, { useReducer, useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListReducer,
} from "./state/todoList/todoList-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks/tasks-reducer";

export type filterValueType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: filterValueType;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducer() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, dispatchTodolistsReducer] = useReducer(todoListReducer, [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "active" },
  ]);

  const [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
    [todoListId1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "JS/ES", isDone: false },
      { id: v1(), title: "REACT", isDone: true },
    ],
    [todoListId2]: [
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Butter", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
  });

  const removeTodoList = (todolistId: string) => {
    const action = removeTodoListAC(todolistId);
    dispatchTodolistsReducer(action);
  };

  const removeTask = (id: string, todolistId: string) => {
    const action = removeTaskAC(id, todolistId);
    dispatchTasksReducer(action);
  };

  const addTask = (value: string, todolistId: string) => {
    const action = addTaskAC(value, todolistId);
    dispatchTasksReducer(action);
  };

  const changeFilter = (value: filterValueType, todolistId: string) => {
    const action = changeTodoListFilterAC(todolistId, value);
    dispatchTodolistsReducer(action);
  };

  const changeIsDone = (
    task: TaskType,
    isDone: boolean,
    todolistId: string
  ) => {
    const action = changeTaskStatusAC(task.id, isDone, todolistId);
    dispatchTasksReducer(action);
  };

  const changeTaskTitle = (
    task: TaskType,
    newTitle: string,
    todolistId: string
  ) => {
    const action = changeTaskTitleAC(task.id, newTitle, todolistId);
    dispatchTasksReducer(action);
  };

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatchTodolistsReducer(action);
    dispatchTasksReducer(action);
  };

  const changeTodoListTitle = (newValue: string, todolistId: string) => {
    const action = changeTodoListTitleAC(newValue, todolistId);
    dispatchTodolistsReducer(action);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={6}>
          {todoLists.map((tl) => {
            let taskForTodoList = tasksObj[tl.id];
            if (tl.filter === "active") {
              taskForTodoList = taskForTodoList.filter(
                (t) => t.isDone === false
              );
            }
            if (tl.filter === "completed") {
              taskForTodoList = taskForTodoList.filter(
                (t) => t.isDone === true
              );
            }
            return (
              <Grid item>
                <Paper style={{ padding: "20px" }}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    tasks={taskForTodoList}
                    title={tl.title}
                    removeTask={removeTask}
                    removeTodoList={removeTodoList}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeIsDone={changeIsDone}
                    filter={tl.filter}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;
