import React, { useCallback, useEffect } from "react";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { Grid, Paper } from "@material-ui/core";
import {
  FilterValuesType,
  TodoListDomainType,
  changeTodoListFilterAC,
  changeTodoListTitleTC,
  createTodoListTC,
  fetchTodoListsTC,
  removeTodoListTC,
} from "./reducers/todoList/todoList-reducer";
import {
  addTaskTC,
  removeTaskTC,
  updateTaskTC,
} from "./reducers/tasks/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { TaskStatuses, TaskType } from "../../api/todoLists-api";
import TodoList from "./TodoList/TodoList";

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

type ToddoListsListPropsType = {};

const ToddoListsList: React.FC<ToddoListsListPropsType> = (props) => {
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(
    (state) => state.todoList
  );
  const tasks = useSelector<AppRootStateType, TaskStateType>(
    (state) => state.tasks
  );

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchTodoListsTC());
  }, [dispatch]);

  const removeTodoList = useCallback(
    (todoListId: string) => {
      const thunk = removeTodoListTC(todoListId);
      //@ts-ignore
      dispatch(thunk);
    },
    [dispatch]
  );

  const removeTask = useCallback(
    (id: string, todoListId: string) => {
      const thunk = removeTaskTC(id, todoListId);
      //@ts-ignore
      dispatch(thunk);
    },
    [dispatch]
  );

  const createTask = useCallback(
    (value: string, todoListId: string) => {
      const thunk = addTaskTC(value, todoListId);
      //@ts-ignore
      dispatch(thunk);
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todoListId: string) => {
      const action = changeTodoListFilterAC(todoListId, value);
      dispatch(action);
    },
    [dispatch]
  );

  const changeStatus = useCallback(
    (task: TaskType, status: TaskStatuses, todoListId: string) => {
      const thunk = updateTaskTC(task, { status });
      //@ts-ignore
      dispatch(thunk);
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (task: TaskType, newTitle: string, todoListId: string) => {
      const thunk = updateTaskTC(task, { title: newTitle });
      //@ts-ignore
      dispatch(thunk);
    },
    [dispatch]
  );

  const addTodoList = useCallback(
    (title: string) => {
      const thunk = createTodoListTC(title);
      //@ts-ignore
      dispatch(thunk);
    },
    [dispatch]
  );

  const changeTodoListTitle = useCallback(
    (newTitle: string, todoListId: string) => {
      const thunk = changeTodoListTitleTC(newTitle, todoListId);
      //@ts-ignore
      dispatch(thunk);
    },
    [dispatch]
  );

  return (
    <div>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={6}>
        {todoLists.map((tl) => {
          return (
            <Grid item>
              <Paper style={{ padding: "20px" }}>
                <TodoList
                  key={tl.id}
                  id={tl.id}
                  tasks={tasks[tl.id]}
                  title={tl.title}
                  removeTask={removeTask}
                  removeTodoList={removeTodoList}
                  changeFilter={changeFilter}
                  addTask={createTask}
                  changeStatus={changeStatus}
                  filter={tl.filter}
                  changeTaskTitle={changeTaskTitle}
                  changeTodoListTitle={changeTodoListTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ToddoListsList;
