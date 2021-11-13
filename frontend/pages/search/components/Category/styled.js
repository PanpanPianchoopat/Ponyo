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
`;

export const TypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12%;
`;

export const TypeCircle = styled.div`
  height: 90px;
  width: 90px;
  background-color: ${COLORS.PRIMARY_YELLOW};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 20px black;
  cursor: pointer;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    height: 70px;
    width: 70px;
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
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;
