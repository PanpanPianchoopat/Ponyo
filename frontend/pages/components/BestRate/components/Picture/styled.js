import styled from "styled-components";
import COLORS from "../../../../../public/constant/colors";
import { StarFilled } from "@ant-design/icons";

export const Description = styled.div.attrs((props) => {
  const showDescription = props.isHovered ? 1 : 0;
  return { showDescription };
})`
  background: rgba(46, 56, 64, 0.8);
  z-index: 20;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  padding: 10px;
  opacity: ${(props) => props.showDescription};
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: white;
`;

export const RestaurantName = styled.text.attrs((props) => {
  const fontSize = props.isTop ? "1.5rem" : "1.1rem";
  return { fontSize };
})`
  font-size: ${(props) => props.fontSize};
`;

export const RestaurantDescription = styled.text.attrs((props) => {
  const fontSize = props.isTop ? "1rem" : "0.8rem";
  return { fontSize };
})`
  font-size: ${(props) => props.fontSize};
`;

export const CoverPic = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
`;

export const Rating = styled.div`
  width: 60px;
  height: 20px;
  border-radius: 50px;
  background: ${COLORS.PRIMARY_RED};
  z-index: 10;
  position: absolute;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  color: white;
  margin: 5px 5px 0 0;
`;

export const StarIcon = styled(StarFilled)`
  color: white;
  margin-right: 5px;
`;
