import styled from "styled-components";
import { Card } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  StarFilled,
} from "@ant-design/icons";
import COLORS from "../../../public/constant/colors";
import BREAKPOINTS from "../../../public/constant/breakpoints";
import {
  BsFillBookmarkFill,
  BsBookmark,
  BsFillGeoAltFill,
} from "react-icons/bs";

export const RestaurantCard = styled(Card)`
  outline: none;
  width: 300px;
  height: auto;
  margin-bottom: 20px;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 200px;
  }
`;

export const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 300px;
  height: 200px;
  overflow: hidden;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 200px;
    height: 150px;
  }
`;

export const CoverPhoto = styled.img`
  height: 100%;
  max-width: 300px;
  margin: 0 auto;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    height: 100%;
  }
`;

export const Status = styled.div.attrs((props) => {
  const bgColor = props.status === "open" ? "#72C19A" : COLORS.PRIMARY_RED;
  return { bgColor };
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 20px;
  z-index: 10;
  position: absolute;
  background: ${(props) => props.bgColor};
  border-radius: 5px;
  color: white;
  font-size: 13px;
  margin: 5px 5px 0 0;
`;

export const Line = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const RestaurantName = styled.text`
  font-weight: bold;
  font-size: 18px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 1rem;
  }
`;

export const PriceRange = styled.text`
  font-weight: bold;
  color: ${COLORS.PRIMARY_RED};
  font-size: 18px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 1rem;
  }
`;

export const Description = styled.text`
  font-size: 0.9rem;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 0.7rem;
  }
`;

export const Star = styled(StarFilled)`
  padding-right: 5px;
  font-size: 15px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 1rem;
  }
`;

export const Rating = styled.text`
  font-size: 12px;
  color: ${COLORS.PRIMARY_YELLOW};
  font-size: 15px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 0.8rem;
  }
`;

export const Location = styled.div`
  display: flex;
  color: ${COLORS.PRIMARY_RED};
  font-size: 15px;
  align-items: center;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 0.8rem;
  }
`;

export const PinIcon = styled(BsFillGeoAltFill)`
  margin-right: 5px;
`;

export const HeartButton = styled(HeartOutlined)`
  svg {
    color: ${COLORS.LIGHT_GREY};
    font-size: 20px;
    @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
      font-size: 1.2rem;
    }
  }
`;

export const ActiveHeartButton = styled(HeartFilled)`
  svg {
    color: ${COLORS.PRIMARY_RED};
    font-size: 20px;
    @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
      font-size: 1.2rem;
    }
  }
`;

export const CommentButton = styled(CommentOutlined)`
  svg {
    color: ${COLORS.LIGHT_GREY};
    font-size: 20px;
    &:hover {
      color: ${COLORS.PRIMARY_BLUE};
    }
    @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
      font-size: 1.2rem;
    }
  }
`;

export const BookmarkButton = styled(BsBookmark)`
  font-size: 20px;
  color: ${COLORS.LIGHT_GREY};
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 1.2rem;
  }
`;

export const ActiveBookmark = styled(BsFillBookmarkFill)`
  font-size: 20px;
  color: ${COLORS.PRIMARY_BLUE};
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 1.2rem;
  }
`;
