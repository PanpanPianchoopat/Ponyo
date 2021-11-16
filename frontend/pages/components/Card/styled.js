import styled from "styled-components";
import { Card } from "antd";
import { StarFilled } from "@ant-design/icons";
import COLORS from "../../../public/constant/colors";
import BREAKPOINTS from "../../../public/constant/breakpoints";
import { BsFillGeoAltFill } from "react-icons/bs";

export const RestaurantCard = styled(Card).attrs((props) => {
  const custom_width = props.size === "large" ? "24%" : "20%";
  const custom_responsive_width = props.size === "large" ? "30%" : "23%";
  return { custom_width, custom_responsive_width };
})`
  outline: none;
  width: ${(props) => props.custom_width};
  height: auto;
  margin: 10px 0.5vw;
  cursor: pointer;
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
  const bgColor = props.status ? "#72C19A" : COLORS.PRIMARY_RED;
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

export const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    flex-direction: column;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    width: 60%;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    width: 100%;
  }
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 10px;
  }
`;
export const RestaurantName = styled.small`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    font-size: 1rem;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 12px;
  }
`;

export const Description = styled.small`
  font-size: 1rem;
  text-align: justify;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    font-size: 0.8rem;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 10px;
  }
`;

export const PriceRange = styled.small`
  font-weight: bold;
  color: ${COLORS.PRIMARY_RED};
  font-size: 1.2rem;
  margin-bottom: 5px;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    font-size: 0.9rem;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 12px;
  }
`;

export const Star = styled(StarFilled)`
  padding-right: 5px;
  font-size: 1.2rem;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    font-size: 0.9rem;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 12px;
    padding-right: 1px;
  }
`;

export const Rating = styled.small`
  color: ${COLORS.PRIMARY_YELLOW};
  font-size: 1.2rem;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    font-size: 0.9rem;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 12px;
  }
`;

export const Location = styled.div`
  display: flex;
  color: ${COLORS.PRIMARY_RED};
  font-size: 1.2rem;
  align-items: center;
  margin-top: 10px;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    font-size: 1rem;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 10px;
    margin-top: 5px;
  }
`;

export const PinIcon = styled(BsFillGeoAltFill)`
  margin: 5px 5px 0 0;
  align-self: flex-start;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    margin: 3px 2px 0 0;
    font-size: 10px;
  }
`;
