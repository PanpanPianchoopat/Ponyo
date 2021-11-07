import styled from "styled-components";
import BREAKPOINTS from "../../../../public/constant/breakpoints";
import COLORS from "../../../../public/constant/colors";
import { Avatar, Rate } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

export const Line = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
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
  color: ${COLORS.PRIMARY_YELLOW};
`;

export const Date = styled.text`
  font-size: 12px;
  color: ${COLORS.LIGHT_GREY};
`;

export const CommentSection = styled.div`
  width: 100%;
  margin-left: 20px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  border-left: 2px solid ${COLORS.LIGHT_GREY};
`;

export const ReviewPic = styled.img`
  width: 100px;
  margin: 0 10px 10px 0;
`;

export const Comment = styled.text`
  font-size: 16px;
  align-self: flex-start;
  margin: 5px 0;
  text-align: left;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    width: 60vw;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 50vw;
  }
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
