import styled from "styled-components";
import { Dropdown } from "antd";
import BREAKPOINTS from "../../../../public/constant/breakpoints.js";

export const DynamicButton = styled.div.attrs((props) => {
  const display = props.isVisible ? "inline" : "none";
  return { display };
})`
  display: ${(props) => props.display};
  position: absolute;
  right: 1rem;
`;

export const LoginButton = styled.div`
  display: flex;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    display: none;
  }
`;

export const HamburgerButton = styled(Dropdown)`
  display: none;
  color: #f3e4d2;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    display: unset;
  }
`;

export const AvatarButton = styled(Dropdown)`
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${BREAKPOINTS.HiDPI_LAPTOP}) {
    width: 40px;
    height: 40px;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    width: 30px;
    height: 30px;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    display: none;
  }
`;

export default DynamicButton;
