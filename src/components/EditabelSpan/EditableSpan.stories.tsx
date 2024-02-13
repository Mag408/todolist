import { action } from "@storybook/addon-actions";
import React from "react";
import { EditableSpan } from "./EditableSpan";

export default {
  tatle: "Task Component",
  component: EditableSpan,
};

const changeTaskTitleCallback = action("Title changed");

export const EditableSpanBaseExample = () => {
  return (
    <>
      <EditableSpan onChange={changeTaskTitleCallback} title={"start text"} />
    </>
  );
};
