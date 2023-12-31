import { Button, IconButton, TextField } from "@material-ui/core";
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<boolean>(false);

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  function addendumTask(inputValue: string) {
    if (!inputValue.trim()) {
      setError(true);
      return;
    }
    props.addItem(inputValue);
    setInputValue("");
  }

  const onKyePressInput: KeyboardEventHandler<HTMLInputElement> = (event) => {
    setError(false);
    if (event.key === "Enter") {
      addendumTask(inputValue);
    }
  };

  return (
    <div>
      <TextField
        variant={"outlined"}
        label={"Type value"}
        value={inputValue}
        onChange={onChangeInput}
        onKeyDown={onKyePressInput}
        error={!!error}
        helperText={error}
      />
      <IconButton
        onClick={() => {
          addendumTask(inputValue);
        }}
        color={"primary"}
      >
        <ControlPointIcon />
      </IconButton>

      {error && <div className="error-message">Field is reqiured </div>}
    </div>
  );
};
