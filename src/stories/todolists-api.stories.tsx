import { useEffect, useState } from "react";
import { todoListAPI } from "../api/todoLists-api";

export default {
  title: "API",
};

export const GetTodoLists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todoListAPI.getTodoLists().then((res) => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodoList = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<any>("");

  const createTodoList = () => {
    todoListAPI.createTodoList(title).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div className="">
        <input
          placeholder="todo title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={createTodoList}>create todo</button>
      </div>
    </div>
  );
};
export const DeleteTodoList = () => {
  const [state, setState] = useState<any>(null);
  const [todoListId, setTodoListId] = useState<string>("");

  const deleteTodoList = () => {
    todoListAPI.deleteTodoList(todoListId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div className="">
        <input
          placeholder="todo title"
          value={todoListId}
          onChange={(e) => {
            setTodoListId(e.target.value);
          }}
        />
        <button onClick={deleteTodoList}>delete todo</button>
      </div>
    </div>
  );
};
export const UpdateTodoListTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todoListId, setTodoListId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const updateTodoListTitle = () => {
    todoListAPI.updateTodoListTitle(todoListId, title).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div className="">
        <input
          placeholder="todo id"
          value={todoListId}
          onChange={(e) => {
            setTodoListId(e.target.value);
          }}
        />
        <input
          placeholder="todo title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={updateTodoListTitle}> update todoList title</button>
      </div>
    </div>
  );
};
export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todoListId, settodoListId] = useState<string>("");

  const getTasks = () => {
    todoListAPI.getTasks(todoListId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div className="">
        <input
          placeholder="todo id"
          value={todoListId}
          onChange={(e) => {
            settodoListId(e.target.value);
          }}
        />
        <button onClick={getTasks}> get tasks</button>
      </div>
    </div>
  );
};
export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todoListId, settodoListId] = useState<string>("");
  const [taskText, setTaskText] = useState<string>("");
  const createTask = () => {
    todoListAPI.createTask(todoListId, taskText).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div className="">
        <input
          placeholder="todo id"
          value={todoListId}
          onChange={(e) => {
            settodoListId(e.target.value);
          }}
        />
        <input
          placeholder="task title"
          value={taskText}
          onChange={(e) => {
            setTaskText(e.target.value);
          }}
        />
        <button onClick={createTask}> create task</button>
      </div>
    </div>
  );
};
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todoListId, settodoListId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  const deleteTask = () => {
    todoListAPI.deleteTask(todoListId, taskId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div className="">
        <input
          placeholder="todo id"
          value={todoListId}
          onChange={(e) => {
            settodoListId(e.target.value);
          }}
        />
        <input
          placeholder="task id"
          value={taskId}
          onChange={(e) => {
            setTaskId(e.target.value);
          }}
        />
        <button onClick={deleteTask}> delete task</button>
      </div>
    </div>
  );
};
export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitke] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const [todoListId, setTodoListId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");

  const updateTaskTitle = () => {
    todoListAPI
      .updateTask(todoListId, taskId, {
        title,
        description,
        status,
        priority,
        startDate,
        deadline,
      })
      .then((res) => {
        setState(res.data);
      });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div className="">
        <input
          placeholder="todoListId"
          value={todoListId}
          onChange={(e) => {
            setTodoListId(e.target.value);
          }}
        />
        <input
          placeholder="taskId"
          value={taskId}
          onChange={(e) => {
            setTaskId(e.target.value);
          }}
        />
        <input
          placeholder="title"
          value={title}
          onChange={(e) => {
            setTitke(e.target.value);
          }}
        />
        <input
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          placeholder="status"
          value={status}
          onChange={(e) => {
            setStatus(+e.target.value);
          }}
        />
        <input
          placeholder="priority"
          value={priority}
          onChange={(e) => {
            setPriority(+e.target.value);
          }}
        />
        <button onClick={updateTaskTitle}> update task</button>
      </div>
    </div>
  );
};
