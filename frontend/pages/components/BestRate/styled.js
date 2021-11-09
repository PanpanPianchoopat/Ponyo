import styled from "styled-components";
import COLORS from "../../../public/constant/colors";
import BREAKPOINTS from "../../../public/constant/breakpoints";

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
  padding: 30px 25vw;
  color: ${(props) => props.textColor};
  font-size: 1.5rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: ${BREAKPOINTS.HiDPI_LAPTOP}) {
    padding: 30px 15vw;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    padding: 30px 20vw;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    padding: 10px 5vw;
  }
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
  height: 380px;
  font-size: 1rem;
  text-shadow: none;
  margin: 20px 0;
  @media (max-width: ${BREAKPOINTS.MDPI_LAPTOP}) {
    height: 250px;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    height: 180px;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    height: 140px;
  }
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
