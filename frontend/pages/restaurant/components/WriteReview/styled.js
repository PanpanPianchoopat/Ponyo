import styled from "styled-components";
import { Rate } from "antd";
import COLORS from "../../../../public/constant/colors";
import BREAKPOINTS from "../../../../public/constant/breakpoints";

export const WriteReviewInnnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  margin: 20px;
`;

export const SectionHeader = styled.b`
  font-size: 20px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 18px;
  }
`;

export const StyledRate = styled(Rate)`
  font-size: 35px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 28px;
  }
`;

export const StyledInput = styled.textarea`
  background: ${COLORS.PRIMARY_LIGHT};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 100px;
  width: 80%;
  resize: none;
  padding: 10px;
`;

export const ButtonGroup = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;
