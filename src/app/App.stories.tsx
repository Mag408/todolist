import { action } from "@storybook/addon-actions";
import React from "react";
import AppWithRedux from "./App";
import { Provider } from "react-redux";
import { store } from "../state/store";
import { ReduxStoreProviderDecorator } from "../stories/ReduxStoreProviderDecorator";

export default {
  tatle: "Task Component",
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],
};

const changeTaskTitleCallback = action("Title changed");

export const AppWithReduxBaseExample = () => {
  return (
    <>
      <AppWithRedux />
    </>
  );
};
