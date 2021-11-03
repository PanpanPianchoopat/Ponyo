import styled from "styled-components";
import COLORS from "../../public/constant/colors";
import BREAKPOINTS from "../../public/constant/breakpoints";

export const HeadSection = styled.div`
  width: 100%;
  background: ${COLORS.PRIMARY_LIGHT};
  padding-bottom: 20px;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    padding-bottom: 5px;
  }
`;
export const Name = styled.div`
  width: 100%;
  background: ${COLORS.PRIMARY_DARK};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 48px;
  color: white;
  padding: 20px 0 40px 0;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    font-size: 36px;
  }
`;

export const Underline = styled.hr`
  width: 100px;
  margin: 5px auto;
  border: 2px solid white;
  border-radius: 10px;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 50px;
  }
`;
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

export const ReviewContainer = styled.div`
  background: linear-gradient(
    180deg,
    ${COLORS.PRIMARY_LIGHT} 170px,
    ${COLORS.PRIMARY_DARK} 0%
  );
  padding: 20px 5vw;
  height: fit-content;
  display: flex;
  justify-content: space-between;
`;
