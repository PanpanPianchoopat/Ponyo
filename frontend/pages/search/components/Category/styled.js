import styled from "styled-components";
import COLORS from "../../../../public/constant/colors";
import BREAKPOINTS from "../../../../public/constant/breakpoints";
import { Image } from "antd";

export const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  background: linear-gradient(180deg, ${COLORS.PRIMARY_DARK} 35%, white 35%);
  padding: 0 90px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    background: linear-gradient(180deg, ${COLORS.PRIMARY_DARK} 28%, white 28%);
  }
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    background: linear-gradient(180deg, ${COLORS.PRIMARY_DARK} 25%, white 25%);
  }
`;

export const TypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12%;
`;

export const TypeCircle = styled.div.attrs((props) => {
  const activeStyle = props.isActive ? "#FFF0AA" : "black";
  return { activeStyle };
})`
  height: 90px;
  width: 90px;
  background-color: ${COLORS.PRIMARY_YELLOW};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 20px ${(props) => props.activeStyle};
  cursor: pointer;
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    filter: brightness(0.7);
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    height: 70px;
    width: 70px;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    height: 50px;
    width: 50px;
  }
`;

export const TypeName = styled.div`
  font-size: 16px;
  letter-spacing: 1px;
  text-align: center;
  padding-top: 20px;
  color: #4c403f;
  @media (max-width: ${BREAKPOINTS.MDPI_LAPTOP}) {
    font-size: 14px;
  }
`;

export const TypeImage = styled(Image)`
  object-fit: contain;
  width: 50px;
  height: 50px;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    height: 35px;
    width: 35px;
  }
`;

export default CategoryContainer;
