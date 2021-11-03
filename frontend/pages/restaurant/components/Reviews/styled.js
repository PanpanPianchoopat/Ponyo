import styled from "styled-components";
import BREAKPOINTS from "../../../../public/constant/breakpoints";
import COLORS from "../../../../public/constant/colors";

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  text-align: center;
  background: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const SectionHeader = styled.b`
  font-size: 20px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 18px;
  }
`;

export const Underline = styled.hr`
  width: 50px;
  margin: 0px auto;
  border: 1px solid black;
  border-radius: 10px;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 20px;
  }
`;

export const ReviewFilters = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 30px;
  justify-content: center;
  overflow: hidden;
`;

export const FilterButton = styled.button.attrs((props) => {
  const bgColor = props.isSelected ? COLORS.PRIMARY_BLUE : "none";
  const textColor = props.isSelected ? "white" : COLORS.PRIMARY_BLUE;
  return { bgColor, textColor };
})`
  width: 150px;
  margin: 0 10px;
  height: 45px;
  background: ${(props) => props.bgColor};
  border: 2px solid ${COLORS.PRIMARY_BLUE};
  border-radius: 50px;
  color: ${(props) => props.textColor};
  font-size: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

export const Number = styled.text`
  font-size: 8px;
`;
