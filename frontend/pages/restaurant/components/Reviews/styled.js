import styled from "styled-components";
import BREAKPOINTS from "../../../../public/constant/breakpoints";
import COLORS from "../../../../public/constant/colors";
import { Avatar, Rate } from "antd";
import { StarFilled, HeartOutlined, HeartFilled } from "@ant-design/icons";

export const SectionContainer = styled.div`
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

export const Underline = styled.hr`
  width: 50px;
  margin: 0px auto;
  border: 1px solid black;
  border-radius: 10px;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 20px;
  }
`;

export const Line = styled.div`
  display: flex;
  align-items: center;
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

export const Star = styled(StarFilled)`
  font-size: 12px;
  color: #fadb14;
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  margin-bottom: 30px;
`;

export const ProfilePic = styled(Avatar)`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

export const ReviewHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Name = styled.b`
  font-size: 16px;
`;

export const Rating = styled(Rate)`
  font-size: 15px;
  margin-right: 15px;
`;

export const Date = styled.text`
  font-size: 12px;
  color: ${COLORS.LIGHT_GREY};
`;

export const CommentSection = styled.div`
  padding-left: 70px;
  display: flex;
  flex-direction: column;
`;

export const ReviewPic = styled.img`
  width: 100px;
  margin: 0 10px 10px 0;
`;

export const Comment = styled.text`
  font-size: 16px;
  align-self: flex-start;
  margin: 5px 0;
`;

export const LikeButton = styled(HeartOutlined)`
  font-size: 20px;
  color: ${COLORS.LIGHT_GREY};
  cursor: pointer;
`;

export const ActiveLikeButton = styled(HeartFilled)`
  font-size: 20px;
  color: ${COLORS.PRIMARY_RED};
  cursor: pointer;
`;

export const LikeNum = styled.b`
  font-size: 14px;
  color: ${COLORS.LIGHT_GREY};
  margin-left: 5px;
`;
