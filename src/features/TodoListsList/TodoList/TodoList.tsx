import React, { useCallback, useEffect } from "react";
import { AddItemForm } from "../../../components/AddItemForm/AddItemForm";
import { EditableSpan } from "../../../components/EditabelSpan/EditableSpan";
import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Task } from "./Task/Task";
import { TaskStatuses, TaskType } from "../../../api/todoLists-api";
import { useDispatch } from "react-redux";
import { fetchTasksTC } from "../reducers/tasks/tasks-reducer";
import { FilterValuesType } from "../reducers/todoList/todoList-reducer";

type TodoListPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTodoList: (todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (taskValue: string, todoListId: string) => void;
  filter: "all" | "active" | "completed";
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
    const thunk = fetchTasksTC(props.id);
    //@ts-ignore
    dispatch(thunk);
  }, []);

  const onAllButtonClick = useCallback(
    () => props.changeFilter("all", props.id),
    []
  );
  const onActiveButtonClick = useCallback(
    () => props.changeFilter("active", props.id),
    []
  );
  const onCompletedButtonClick = useCallback(
    () => props.changeFilter("completed", props.id),
    []
  );

  const onClickTodoListRemoveButton = () => props.removeTodoList(props.id);

  const changeTodoListTitleHandler = useCallback(
    (newTitle: string) => {
      props.changeTodoListTitle(newTitle, props.id);
    },
    [props.changeTodoListTitle, props.id]
  );

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id]
  );

  let taskForTodoList = props.tasks;

  if (props.filter === "active") {
    taskForTodoList = taskForTodoList.filter(
      (t) => t.status === TaskStatuses.New
    );
  }
  if (props.filter === "completed") {
    taskForTodoList = taskForTodoList.filter(
      (t) => t.status === TaskStatuses.Completed
    );
  }

  return (
    <div className="todoList">
      <h3>
        <EditableSpan
          title={props.title}
          onChange={changeTodoListTitleHandler}
        />{" "}
        <IconButton onClick={onClickTodoListRemoveButton}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {taskForTodoList.map((task) => (
          <Task
            key={task.id}
            changeIsDone={props.changeStatus}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
            task={task}
            todoListId={props.id}
          />
        ))}
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllButtonClick}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "text"}
          color={"primary"}
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveButtonClick}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "text"}
          color={"secondary"}
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedButtonClick}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});

export default TodoList;
