import styled from "styled-components";
import { Dropdown } from "antd";
import BREAKPOINTS from "../../../../../public/constant/breakpoints.js";

export const LoginButton = styled.div`
  position: absolute;
  right: 1rem;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    display: none;
  }
`;

export const HamburgerButton = styled(Dropdown)`
  display: none;
  position: absolute;
  right: 1rem;
  color: #f3e4d2;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    display: unset;
  }
`;

export const AvatarButton = styled(Dropdown)`
  position: absolute;
  right: 1rem;
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
