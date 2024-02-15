import { Button, IconButton, TextField } from "@material-ui/core";
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(
  (props) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<boolean>(false);

    const onChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
      setInputValue(event.target.value);
    };

    function addendumTask(inputValue: string) {
      if (error !== false) {
        setError(false);
      }
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
          disabled={props.disabled}
        />
        <IconButton
          onClick={() => {
            addendumTask(inputValue);
          }}
          color={"primary"}
          disabled={props.disabled}
        >
          <ControlPointIcon />
        </IconButton>

        {error && <div className="error-message">Field is reqiured </div>}
      </div>
    );
  }
);
