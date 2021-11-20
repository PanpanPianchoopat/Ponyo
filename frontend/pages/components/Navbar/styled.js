import styled from "styled-components";
import COLOR from "../../../public/constant/colors";
import Image from "next/image";
import BREAKPOINTS from "../../../public/constant/breakpoints";

export const StyledNav = styled.div`
  width: 100%;
  height: 80px;
  background: ${COLOR.PRIMARY_DARK};
  display: flex;
  position: fixed;
  top: 0;
  z-index: 100;
  overflow: hidden;
  font-family: Helvetica;
  @media (max-width: ${BREAKPOINTS.HiDPI_LAPTOP}) {
    height: 60px;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    height: 40px;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    height: 30px;
  }
`;

export const Logo = styled.div`
  width: 10%;
  position: relative;
`;

export const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`;

export const Menu = styled.div`
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
`;

export const MenuItem = styled.div`
  display: flex;
  align-self: center;
  font-size: 24px;
  color: ${(props) =>
    props.active ? COLOR.PRIMARY_YELLOW : "rgba(246, 190, 15, 0.5)"};
  margin: 2rem;
  cursor: pointer;
  @media (max-width: ${BREAKPOINTS.HiDPI_LAPTOP}) {
    font-size: 20px;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 16px;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    font-size: 12px;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    display: none;
  }
`;
