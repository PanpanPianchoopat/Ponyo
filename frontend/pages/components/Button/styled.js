import styled from "styled-components";
import COLORS from "../../../public/constant/colors";

export const StyledButton = styled.button.attrs((props) => {
  const customColor = props.customColor;
  const customStyle = props.customStyle;
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
  const borderStyle = customStyle === "round" ? "50px" : "5px";
  const textColor =
    customColor === "transparent"
      ? "rgba(76, 64, 63, 0.5)"
      : customColor === "yellow"
      ? "#4C403E"
      : "white";

  return { bgColor, borderType, borderStyle, textColor };
})`
  height: 30px;
  width: fit-content;
  background: ${(props) => props.bgColor};
  border: ${(props) => props.borderType};
  margin: 10px;
  padding: 0 20px;
  border-radius: ${(props) => props.borderStyle};
  color: ${(props) => props.textColor};
  font-size: 15px;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    filter: brightness(0.9);
  }
`;
