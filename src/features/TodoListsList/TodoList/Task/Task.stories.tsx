import { action } from "@storybook/addon-actions";
import React from "react";
import { Task } from "./Task";
import { TaskStatuses } from "../../../../api/todoLists-api";

export default {
  tatle: "Task Component",
  component: Task,
};

const changeIsDoneCallback = action("Status changed");
const changeTaskTitleCallback = action("Title changed");
const removeTaskCallback = action("Remove task");

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        changeIsDone={changeIsDoneCallback}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        task={{
          id: "1",
          title: "css",
          description: "",
          status: TaskStatuses.Completed,
          priority: 0,
          startDate: "",
          deadline: "",
          todoListId: "1",
          order: 0,
          addedDate: "",
        }}
        todoListId={"todoListId1"}
      />
      <Task
        changeIsDone={changeIsDoneCallback}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        task={{
          id: "1",
          title: "html",
          status: TaskStatuses.New,
          description: "",
          priority: 0,
          startDate: "",
          deadline: "",
          todoListId: "1",
          order: 0,
          addedDate: "",
        }}
        todoListId={"todoListId2"}
      />
    </>
  );
};
