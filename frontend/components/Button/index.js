/*******************************************************************************
 * Button component
 * 'variant'  is the color theme of the button. It can be yellow, red, green,
 *            turquoise, dark, or transparent. Otherwise, button
 *            styles (background, text color, and border color) will be set to
 *            default styles.
 * 'outline'  is border style of the button. If this field is set to 'round',
 *            border radius of the button is set to 50px so that it is round.
 *            Otherwise, button border is squared.
 * 'size'     is width of the button. If this field is set to 'large', button
 *            width is 30vw. Otherwise, button width would set to 'fit-content'.
 ******************************************************************************/

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
