import React from "react";

type ButtonPropsType = {
  value: string;
};

const Button: React.FC<ButtonPropsType> = (props) => {
  return <button>{props.value}</button>;
};

export default Button;
