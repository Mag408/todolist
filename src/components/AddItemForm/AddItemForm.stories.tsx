import { AddItemForm } from "./AddItemForm";
import { action } from "@storybook/addon-actions";
import React from "react";

export default {
  tatle: "AddItemForm Component",
  component: AddItemForm,
};

const callback = action("Button 'add' was pressed insissed the from");

export const AddItemFormBaseExample = (props: any) => {
  return <AddItemForm addItem={callback} />;
};

export const AddItemFormDisabledBaseExample = (props: any) => {
  return <AddItemForm addItem={callback} disabled={true} />;
};
