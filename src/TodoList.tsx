import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";
import Button from "./Button";
import { filterValueType } from "./App";

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
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

const TodoList: React.FC<TodoListPropsType> = ({
  id,
  title,
  tasks,
  removeTask,
  removeTodoList,
  changeFilter,
  addTask,
  changeIsDone,
  filter,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<boolean>(false);

  function addendumTask(inputValue: string) {
    if (!inputValue.trim()) {
      setError(true);
      return;
    }
    addTask(inputValue, id);
    setInputValue("");
  }

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  const onKyePressInput: KeyboardEventHandler<HTMLInputElement> = (event) => {
    setError(false);
    if (event.key === "Enter") {
      addendumTask(inputValue);
    }
  };

  const onAllButtonClick = () => changeFilter("all", id);
  const onActiveButtonClick = () => changeFilter("active", id);
  const onCompletedButtonClick = () => changeFilter("completed", id);

  const onClickTodoListButton = () => removeTodoList(id);

  return (
    <div className="todoList">
      <h3>
        {title} <button onClick={onClickTodoListButton}>X</button>
      </h3>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={onChangeInput}
          onKeyDown={onKyePressInput}
          className={error ? "error" : ""}
        />
        <button
          style={{
            width: "15px",
            height: "21px",
            textAlign: "center",
            padding: "0 2px",
          }}
          onClick={() => {
            addendumTask(inputValue);
          }}
        >
          +
        </button>
        <div className={error ? "error-messenge" : ""}>
          {error ? "Field is reqiured" : ""}
        </div>
      </div>
      <ul>
        {tasks.map((task) => {
          const onClickRemoveTask = () => removeTask(task.id, id);
          const onClickCheckbox = (e: any) => {
            changeIsDone(task, e.target.checked, id);
          };

          return (
            <li className={task.isDone ? "is-done" : ""} key={task.id}>
              <input
                onChange={onClickCheckbox}
                type="checkbox"
                checked={task.isDone}
              />
              <span>{task.title}</span>
              <button onClick={onClickRemoveTask}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={onAllButtonClick}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={onActiveButtonClick}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedButtonClick}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
