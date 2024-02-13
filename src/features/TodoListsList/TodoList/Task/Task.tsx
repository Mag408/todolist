import { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@material-ui/core";
import { EditableSpan } from "../../../../components/EditabelSpan/EditableSpan";
import { Delete } from "@material-ui/icons";
import React from "react";
import { TaskStatuses, TaskType } from "../../../../api/todoLists-api";

type TaskPropsType = {
  todoListId: string;
  task: TaskType;
  changeIsDone: (
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
};

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  const onClickRemoveTask = useCallback(
    () => props.removeTask(props.task.id, props.todoListId),
    [props.task.id, props.todoListId]
  );
  const onClickCheckbox = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      props.changeIsDone(
        props.task,
        e.target.checked ? TaskStatuses.Completed : TaskStatuses.New,
        props.todoListId
      );
    },
    [props.task, props.todoListId]
  );
  const onChangeTaskTitleHangler = useCallback(
    (nweValue: string) => {
      props.changeTaskTitle(props.task, nweValue, props.todoListId);
    },
    [props.task, props.todoListId, props.changeTaskTitle]
  );

  return (
    <div
      className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
      key={props.task.id}
    >
      <Checkbox
        onChange={onClickCheckbox}
        checked={props.task.status === TaskStatuses.Completed}
      />
      <EditableSpan
        onChange={onChangeTaskTitleHangler}
        title={props.task.title}
      />
      <IconButton onClick={onClickRemoveTask}>
        <Delete />
      </IconButton>
    </div>
  );
});
