import styled from "styled-components";
import { Rate } from "antd";
import BREAKPOINTS from "../../../../public/constant/breakpoints";

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  margin: 15px;
`;

export const SectionHeader = styled.b`
  font-size: 20px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 18px;
  }
`;

export const EachRate = styled.div`
  display: flex;
  width: 100%;
`;

export const RestaurantRate = styled(Rate)`
  font-size: 1rem;
  margin-right: 10px;
`;

export const NumContainer = styled.div`
  display: flex;
  min-width: 40%;
  align-items: center;
`;

export const Count = styled.text`
  color: #858585;
  font-size: 0.5rem;
  margin-left: 10px;
`;
