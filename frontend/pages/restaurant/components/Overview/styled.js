import styled from "styled-components";
import COLORS from "../../../../public/constant/colors";
import BREAKPOINTS from "../../../../public/constant/breakpoints";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Rate } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

export const OverviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
`;

export const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    font-size: 0.8rem;
  }
`;

export const Inline = styled.div`
  display: flex;
  align-items: center;
`;

export const RestName = styled.b`
  font-size: 2rem;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    font-size: 1rem;
  }
`;

export const Status = styled.div.attrs((props) => {
  const bgColor = props.open ? COLORS.LIGHT_GREEN : COLORS.PRIMARY_RED;
  return { bgColor };
})`
  background: ${(props) => props.bgColor};
  color: white;
  height: fit-content;
  padding: 0 10px;
  border-radius: 5px;
  margin-right: 10px;
`;

export const Bookmark = styled(BsBookmark)`
  font-size: 25px;
  color: ${COLORS.LIGHT_GREY};
  cursor: pointer;
`;

export const BookmarkActive = styled(BsBookmarkFill)`
  font-size: 25px;
  color: ${COLORS.PRIMARY_BLUE};
  cursor: pointer;
`;

export const PriceRange = styled.small`
  font-size: 24px;
  color: ${COLORS.PRIMARY_RED};
  font-weight: bold;
`;

export const Record = styled.small`
  font-size: 12px;
  color: ${COLORS.DARK_GREY};
  margin-top: -15px;
`;

export const AverageRate = styled(Rate)`
  font-size: 30px;
  color: ${COLORS.PRIMARY_YELLOW};
`;

export const AvgRateText = styled.small`
  font-size: 15px;
  color: ${COLORS.PRIMARY_YELLOW};
  margin-left: 15px;
`;

export const Heart = styled(HeartOutlined)`
  font-size: 25px;
  color: ${COLORS.LIGHT_GREY};
`;

export const HeartACtive = styled(HeartFilled)`
  font-size: 25px;
  color: ${COLORS.PRIMARY_RED};
`;

export default OverviewContainer;
