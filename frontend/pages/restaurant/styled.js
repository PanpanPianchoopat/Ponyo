import styled from "styled-components";
import COLORS from "../../public/constant/colors";
import BREAKPOINTS from "../../public/constant/breakpoints";
import { StarFilled } from "@ant-design/icons";

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
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 32px;
    padding: 15px 0;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    font-size: 28px;
    padding: 15px 0;
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

export const DetailWrapper = styled.div`
  display: grid;
  background: ${COLORS.PRIMARY_LIGHT};
  padding: 0 5vw;
  gap: 15px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas:
    "overview overview overview detail detail"
    "overview overview overview detail detail"
    "review review review detail detail"
    "review review review rating rating"
    "review review review rating rating";
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    display: flex;
    flex-direction: column;
  }
`;

export const SectionWrapper = styled.div`
  display: flex;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

export const OverviewWrapper = styled(SectionWrapper)`
  grid-area: overview;
`;

export const RestDetailWrapper = styled(SectionWrapper)`
  grid-area: detail;
`;

export const WriteReviewWrapper = styled(SectionWrapper)`
  grid-area: review;
`;

export const RatingsWrapper = styled(SectionWrapper)`
  grid-area: rating;
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
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    padding: 10px 5vw;
  }
`;

export const ReviewInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

export const SectionUnderline = styled.hr`
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
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: center;
  overflow: hidden;
`;

export const FilterButton = styled.button.attrs((props) => {
  const bgColor = props.isSelected ? COLORS.PRIMARY_BLUE : "none";
  const textColor = props.isSelected ? "white" : "black";
  return { bgColor, textColor };
})`
  width: 150px;
  margin: 5px 10px;
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

export const Number = styled.small.attrs((props) => {
  const textColor = props.isSelected ? "white" : COLORS.DARK_GREY;
  return { textColor };
})`
  font-size: 8px;
  color: ${(props) => props.textColor};
`;

export const Star = styled(StarFilled)`
  font-size: 12px;
  color: ${COLORS.PRIMARY_YELLOW};
`;

export const ReviewsContainer = styled.div`
  width: 100%;
  height: 850px;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;
  @media (max-width: ${BREAKPOINTS.HiDPI_LAPTOP}) {
    height: 500px;
  }
`;

export const EmptyDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${COLORS.DARK_GREY};
`;

export const EmptyIcon = styled.img`
  width: 140px;
  margin-bottom: 15px;
`;

export default HeadSection;
