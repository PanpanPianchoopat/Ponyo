import styled from "styled-components";
import COLOR from "../../../public/constant/colors";
import Image from "next/image";

export const StyledNav = styled.div`
  width: 100%;
  height: 60px;
  background: ${COLOR.PRIMARY_DARK};
  display: flex;
  position: fixed;
  top: 0;
  z-index: 100;
  overflow: hidden;
  font-family: Helvetica;
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
`;

export const MenuItem = styled.div`
  display: flex;
  align-self: center;
  font-size: 20px;
  color: ${(props) =>
    props.active ? COLOR.PRIMARY_YELLOW : "rgba(246, 190, 15, 0.5)"};
  margin: 2rem;
  cursor: pointer;
`;
