import React, { useCallback, useEffect } from "react";
import { AddItemForm } from "../../../components/AddItemForm/AddItemForm";
import { EditableSpan } from "../../../components/EditabelSpan/EditableSpan";
import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Task } from "./Task/Task";
import {
  TaskStatuses,
  TaskType,
  TodoListType,
} from "../../../api/todoLists-api";
import { useDispatch } from "react-redux";
import { fetchTasksTC } from "../reducers/tasks/tasks-reducer";
import {
  FilterValuesType,
  TodoListDomainType,
} from "../reducers/todoList/todoList-reducer";

type TodoListPropsType = {
  todoList: TodoListDomainType;
  tasks: Array<TaskType>;
  removeTodoList: (todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (taskValue: string, todoListId: string) => void;
  changeStatus: (
    task: TaskType,
    status: TaskStatuses,
    todoListId: string
  ) => void;
  changeTaskTitle: (
    task: TaskType,
    newTitle: string,
    todoListId: string
  ) => void;
  removeTask: (id: string, todoListId: string) => void;
  changeTodoListTitle: (newValue: string, todoListId: string) => void;
};

const TodoList: React.FC<TodoListPropsType> = React.memo((props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const thunk = fetchTasksTC(props.todoList.id);
    //@ts-ignore
    dispatch(thunk);
  }, []);

  const onAllButtonClick = useCallback(
    () => props.changeFilter("all", props.todoList.id),
    []
  );
  const onActiveButtonClick = useCallback(
    () => props.changeFilter("active", props.todoList.id),
    []
  );
  const onCompletedButtonClick = useCallback(
    () => props.changeFilter("completed", props.todoList.id),
    []
  );

  const onClickTodoListRemoveButton = () =>
    props.removeTodoList(props.todoList.id);

  const changeTodoListTitleHandler = useCallback(
    (newTitle: string) => {
      props.changeTodoListTitle(newTitle, props.todoList.id);
    },
    [props.changeTodoListTitle, props.todoList.id]
  );

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todoList.id);
    },
    [props.addTask, props.todoList.id]
  );

  let taskForTodoList = props.tasks;

  if (props.todoList.filter === "active") {
    taskForTodoList = taskForTodoList.filter(
      (t) => t.status === TaskStatuses.New
    );
  }
  if (props.todoList.filter === "completed") {
    taskForTodoList = taskForTodoList.filter(
      (t) => t.status === TaskStatuses.Completed
    );
  }

  return (
    <div className="todoList">
      <h3>
        <EditableSpan
          title={props.todoList.title}
          onChange={changeTodoListTitleHandler}
        />{" "}
        <IconButton
          onClick={onClickTodoListRemoveButton}
          disabled={props.todoList.entityStatus === "loading"}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm
        addItem={addTask}
        disabled={props.todoList.entityStatus === "loading"}
      />
      <div>
        {taskForTodoList?.map((task) => (
          <Task
            key={task.id}
            changeIsDone={props.changeStatus}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
            task={task}
            todoListId={props.todoList.id}
          />
        ))}
      </div>
      <div>
        <Button
          variant={props.todoList.filter === "all" ? "contained" : "text"}
          className={props.todoList.filter === "all" ? "active-filter" : ""}
          onClick={onAllButtonClick}
        >
          All
        </Button>
        <Button
          variant={props.todoList.filter === "active" ? "contained" : "text"}
          color={"primary"}
          className={props.todoList.filter === "active" ? "active-filter" : ""}
          onClick={onActiveButtonClick}
        >
          Active
        </Button>
        <Button
          variant={props.todoList.filter === "completed" ? "contained" : "text"}
          color={"secondary"}
          className={
            props.todoList.filter === "completed" ? "active-filter" : ""
          }
          onClick={onCompletedButtonClick}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});

export default TodoList;
