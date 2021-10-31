import React from "react";
import { StyledButton } from "./styled";

const Button = ({ children, ...props }) => {
  return (
    <StyledButton
      customColor={props.variant}
      customStyle={props.outline}
      customSize={props.size}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
