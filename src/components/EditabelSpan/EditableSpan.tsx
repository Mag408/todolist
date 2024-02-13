import { TextField } from "@material-ui/core";
import React, { ChangeEvent, KeyboardEventHandler, useState } from "react";

export type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};
export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(
  (props) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");

    const activateEditeMode = () => {
      setEditMode(true);
      setTitle(props.title);
    };
    const activateViweMode = () => {
      setEditMode(false);
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };
    const onKyePressInput: KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (event.key === "Enter") {
        props.onChange(title);
        setEditMode(false);
      }
    };

    return editMode ? (
      <TextField
        value={title}
        onChange={onChangeTitleHandler}
        onBlur={activateViweMode}
        autoFocus
        onKeyDown={onKyePressInput}
      />
    ) : (
      <span onDoubleClick={activateEditeMode}>{props.title}</span>
    );
  }
);
