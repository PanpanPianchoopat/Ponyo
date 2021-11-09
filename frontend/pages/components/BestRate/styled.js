import styled, { withTheme } from "styled-components";
import COLORS from "../../../public/constant/colors";

export const BestRateContianer = styled.div.attrs((props) => {
  const bgColor = props.isDark ? COLORS.PRIMARY_DARK : "white";
  const textColor = props.isDark ? "white" : "#14454B";
  return { bgColor, textColor };
})`
  width: 100%;
  background: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 5vw;
  color: ${(props) => props.textColor};
  font-size: 1.5rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Underline = styled.hr.attrs((props) => {
  const lineColor = props.isDark ? "white" : COLORS.PRIMARY_BLUE;
  return { lineColor };
})`
  width: 60px;
  margin: 5px auto;
  border: 2px solid ${(props) => props.lineColor};
  border-radius: 10px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  font-size: 1rem;
  text-shadow: none;
  margin: 20px 0;
`;

export const BigImage = styled.div`
  width: 49.5%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SmallImageContainer = styled.div`
  width: 49%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SmallImage = styled.div`
  width: 100%;
  height: 48%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
