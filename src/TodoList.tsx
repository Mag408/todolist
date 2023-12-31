import React, { ChangeEvent, ChangeEventHandler } from "react";
import { filterValueType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton, Checkbox } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

type TodoListPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  removeTodoList: (todolistId: string) => void;
  changeFilter: (value: filterValueType, todolistId: string) => void;
  addTask: (taskValue: string, todolistId: string) => void;
  changeIsDone: (task: TaskType, isDone: boolean, todolistId: string) => void;
  filter: "all" | "active" | "completed";
  changeTaskTitle: (
    task: TaskType,
    newTitle: string,
    todolistId: string
  ) => void;
  changeTodoListTitle: (newValue: string, todolistId: string) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

const TodoList: React.FC<TodoListPropsType> = (props) => {
  const onAllButtonClick = () => props.changeFilter("all", props.id);
  const onActiveButtonClick = () => props.changeFilter("active", props.id);
  const onCompletedButtonClick = () =>
    props.changeFilter("completed", props.id);

  const onClickTodoListRemoveButton = () => props.removeTodoList(props.id);

  const changeTodoListTitleHandler = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.id);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

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
        {props.tasks.map((task) => {
          const onClickRemoveTask = () => props.removeTask(task.id, props.id);
          const onClickCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeIsDone(task, e.target.checked, props.id);
          };
          const onChangeTaskTitleHangler = (nweValue: string) => {
            props.changeTaskTitle(task, nweValue, props.id);
          };

          return (
            <div className={task.isDone ? "is-done" : ""} key={task.id}>
              <Checkbox onChange={onClickCheckbox} checked={task.isDone} />
              <EditableSpan
                onChange={onChangeTaskTitleHangler}
                title={task.title}
              />
              <IconButton onClick={onClickRemoveTask}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
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
};

export default TodoList;
