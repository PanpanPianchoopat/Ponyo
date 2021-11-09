import styled from "styled-components";
import COLORS from "../../../public/constant/colors";
import BREAKPOINTS from "../../../public/constant/breakpoints";

export const StyledButton = styled.button.attrs((props) => {
  const customColor = props.customColor;
  const customStyle = props.customStyle;
  const customSize = props.customSize === "large" ? "30vw" : "fit-content";
  const bgColor =
    customColor === "yellow"
      ? COLORS.PRIMARY_YELLOW
      : customColor === "red"
      ? COLORS.PRIMARY_RED
      : customColor === "green"
      ? COLORS.LIGHT_GREEN
      : customColor === "turquoise"
      ? COLORS.PRIMARY_BLUE
      : "white";
  const borderType =
    customColor === "transparent" ? "rgba(76, 64, 63, 0.5) 2px solid" : "none";
  const borderStyle = customStyle === "round" ? "50px" : "0px";
  const textColor =
    customColor === "transparent"
      ? "rgba(76, 64, 63, 0.5)"
      : customColor === "yellow"
      ? "#4C403E"
      : "white";

  return { bgColor, borderType, borderStyle, textColor, customSize };
})`
  height: 35px;
  width: ${(props) => props.customSize};
  background: ${(props) => props.bgColor};
  border: ${(props) => props.borderType};
  padding: 0 2.5vw;
  border-radius: ${(props) => props.borderStyle};
  color: ${(props) => props.textColor};
  font-size: 0.9rem;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    filter: brightness(0.9);
  }
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    height: 30px;
    font-size: 0.7rem;
  }
`;
