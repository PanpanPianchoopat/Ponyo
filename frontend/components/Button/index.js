import React from "react";
import { StyledButton } from "./styled";

const Button = ({ children, ...props }) => {
  return (
    <StyledButton
      customColor={props.variant}
      customStyle={props.outline}
      customSize={props.size}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
