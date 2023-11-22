import React, { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";

export type filterValueType = "all" | "active" | "completed";
export type TodoListTapes = {
  id: string;
  title: string;
  filter: filterValueType;
};

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListTapes>>([
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "active" },
  ]);

  const [tasksObj, setTasksObj] = useState({
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
    let filteredTodoList = todoLists.filter((TD) => TD.id !== todolistId);
    setTodoLists(filteredTodoList);
    console.log(tasksObj);
    delete tasksObj[todolistId];
    console.log(tasksObj);
  };

  const removeTask = (id: string, todolistId: string) => {
    let filteredTasks = tasksObj[todolistId].filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasksObj({ ...tasksObj });
  };

  const addTask = (value: string, todolistId: string) => {
    const newTask = { id: v1(), title: value, isDone: false };
    tasksObj[todolistId] = [newTask, ...tasksObj[todolistId]];
    setTasksObj({ ...tasksObj });
  };

  const changeFilter = (value: filterValueType, todolistId: string) => {
    const todoList = todoLists.find((tl) => tl.id === todolistId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  const changeIsDone = (
    task: TaskType,
    isDone: boolean,
    todolistId: string
  ) => {
    // tasksObj[todolistId].forEach((t) => {
    //   if (t.id === task.id) {
    //     t.isDone = isDone;
    //   }
    // });
    const foundTask = tasksObj[todolistId].find((t) => t.id === task.id);
    if (foundTask) {
      foundTask.isDone = isDone;
    }

    setTasksObj({ ...tasksObj });
  };

  return (
    <div className="App">
      {todoLists.map((tl) => {
        let taskForTodoList = tasksObj[tl.id];
        if (tl.filter === "active") {
          taskForTodoList = taskForTodoList.filter((t) => t.isDone === false);
        }
        if (tl.filter === "completed") {
          taskForTodoList = taskForTodoList.filter((t) => t.isDone === true);
        }
        return (
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
          />
        );
      })}
    </div>
  );
}

export default App;
