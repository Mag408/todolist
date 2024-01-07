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
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type filterValueType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: filterValueType;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, TodoListType[]>(
    (state) => state.todolist
  );
  const tasks = useSelector<AppRootState, TaskStateType>(
    (state) => state.tasks
  );

  const removeTodoList = (todolistId: string) => {
    const action = removeTodoListAC(todolistId);
    dispatch(action);
  };

  const removeTask = (id: string, todolistId: string) => {
    console.log("remove task");
    const action = removeTaskAC(id, todolistId);
    dispatch(action);
  };

  const addTask = (value: string, todolistId: string) => {
    const action = addTaskAC(value, todolistId);
    dispatch(action);
  };

  const changeFilter = (value: filterValueType, todolistId: string) => {
    const action = changeTodoListFilterAC(todolistId, value);
    dispatch(action);
  };

  const changeIsDone = (
    task: TaskType,
    isDone: boolean,
    todolistId: string
  ) => {
    const action = changeTaskStatusAC(task.id, isDone, todolistId);
    dispatch(action);
  };

  const changeTaskTitle = (
    task: TaskType,
    newTitle: string,
    todolistId: string
  ) => {
    const action = changeTaskTitleAC(task.id, newTitle, todolistId);
    dispatch(action);
  };

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatch(action);
  };

  const changeTodoListTitle = (newValue: string, todolistId: string) => {
    const action = changeTodoListTitleAC(newValue, todolistId);
    dispatch(action);
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
          {todolists.map((tl) => {
            let taskForTodoList = tasks[tl.id];
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

export default AppWithRedux;
