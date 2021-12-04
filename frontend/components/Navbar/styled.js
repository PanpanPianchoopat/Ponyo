import styled from "styled-components";
import Image from "next/image";
import BREAKPOINTS from "../../public/constant/breakpoints";
import COLOR from "../../public/constant/colors";

export const StyledNav = styled.div.attrs((props) => {
  const display = props.isVisible ? "flex" : "none";
  return { display };
})`
  width: 100%;
  height: 80px;
  background: ${COLOR.PRIMARY_DARK};
  display: ${(props) => props.display};
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
  margin-left: 1rem;
  cursor: pointer;
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    margin-left: 10px;
  }
`;

export const StyledImage = styled.img`
  height: 100%;
`;

export const Menu = styled.div`
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
`;

export const MenuItem = styled.div.attrs((props) => {
  const menuDisplay = props.visible ? "flex" : "none";
  return { menuDisplay };
})`
  display: ${(props) => props.menuDisplay};
  font-size: 20px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 16px;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    font-size: 14px;
  }
`;

export const StyledLink = styled.a.attrs((props) => {
  const textColor = props.isActive
    ? COLOR.PRIMARY_YELLOW
    : "rgba(246, 190, 15, 0.5)";
  return { textColor };
})`
  color: ${(props) => props.textColor};
  text-decoration: none;
  &: hover {
    color: ${COLOR.PRIMARY_YELLOW};
  }
`;

export const BackButton = styled.button`
  border: none;
  background: none;
  height: 100%;
  width: 100px;
  font-size: 18px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 14px;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 11px;
    width: 60px;
  }
`;

export default StyledNav;
