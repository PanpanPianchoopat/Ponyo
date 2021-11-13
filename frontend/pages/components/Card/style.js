import styled from "styled-components";
import { Card } from "antd";
import { StarFilled } from "@ant-design/icons";
import COLORS from "../../../public/constant/colors";
import BREAKPOINTS from "../../../public/constant/breakpoints";
import { BsFillGeoAltFill } from "react-icons/bs";

export const RestaurantCard = styled(Card).attrs((props) => {
  const custom_width = props.size === "large" ? "30%" : "20%";
  const custom_responsive_width = props.size === "large" ? "30%" : "23%";
  return { custom_width, custom_responsive_width };
})`
  .ant-card-body {
    padding: 20px;
  }
  .ant-card-head {
    border: none;
    position: relative;
    background: ${COLORS.PRIMARY_DARK};
    width: 100%;
    max-height: 20px;
    display: flex;
    justify-content: center;
  }
  outline: none;
  width: ${(props) => props.custom_width};
  height: auto;
  margin: 10px 0.5vw;

  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    width: ${(props) => props.custom_responsive_width};
  }
  @media (max-width: ${BREAKPOINTS.HiDPI_LAPTOP}) {
    width: 30%;
  }
  @media (max-width: ${BREAKPOINTS.MDPI_LAPTOP}) {
    width: 45%;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    width: 32%;
    .ant-card-body {
      padding: 10px;
    }
  }
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    margin: 5px 1vw;
    width: 46%;
  }
  @media (max-width: 550px) {
    width: 90%;
  }
`;

export const CoverContainer = styled.div.attrs((props) => {
  const customSize = props.size === "large" ? "250px" : "200px";
  return { customSize };
})`
  display: flex;
  align-items: space-between;
  width: 100%;
  height: ${(props) => props.customSize};
  overflow: hidden;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    height: 120px;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    height: 180px;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    height: 200px;
  }
`;

export const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  justify-content: space-between;
  flex-direction: row-reverse;
`;

export const Ranking = styled.div.attrs((props) => {
  const isVisible = props.showRank;
  return { isVisible };
})`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background; ${COLORS.PRIMARY_YELLOW};
  color: white;
  width: 40px;
  height: 40px;
  background: ${COLORS.PRIMARY_YELLOW};
  border-radius: 50px;
  border: 4px solid ${COLORS.PRIMARY_DARK};
  margin-top: 40px;
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
  background: ${(props) => props.bgColor};
  border-radius: 5px;
  color: white;
  font-size: 13px;
  margin: 5px 5px 0 0;
`;

export const CoverPhoto = styled.img`
  height: 100%;
  width: auto;
  margin: 0 auto;
`;

export const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const RestaurantName = styled.text`
  font-weight: bold;
  font-size: 1.1rem;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    font-size: 0.9rem;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 12px;
  }
`;

export const PriceRange = styled.text`
  font-weight: bold;
  color: ${COLORS.PRIMARY_RED};
  font-size: 1.1rem;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    font-size: 12px;
  }
`;

export const Description = styled.text`
  font-size: 0.8rem;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    font-size: 0.8rem;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 10px;
  }
`;

export const Star = styled(StarFilled)`
  padding-right: 5px;
  font-size: 0.8rem;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    font-size: 0.8rem;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 10px;
    padding-right: 1px;
  }
`;

export const Rating = styled.text`
  color: ${COLORS.PRIMARY_YELLOW};
  font-size: 0.8rem;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    font-size: 10px;
  }
`;

export const Location = styled.div`
  display: flex;
  color: ${COLORS.PRIMARY_RED};
  font-size: 0.9rem;
  align-items: center;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 10px;
  }
`;

export const PinIcon = styled(BsFillGeoAltFill)`
  margin-right: 5px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    margin-right: 2px;
    font-size: 10px;
  }
`;
