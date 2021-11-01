import styled from "styled-components";
import COLORS from "../../public/constant/colors";
import BREAKPOINTS from "../../public/constant/breakpoints";

export const DetailContainer = styled.div`
  background: ${COLORS.PRIMARY_LIGHT};
  padding: 20px 5vw;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    flex-direction: column;
  }
`;

export const BigContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  height: fit-content;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const SmallContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 35%;
  height: fit-content;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 100%;
    margin-bottom: 20px;
  }
`;
