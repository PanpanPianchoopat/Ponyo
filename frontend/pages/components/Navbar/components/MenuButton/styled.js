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
