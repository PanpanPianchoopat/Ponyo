import styled from "styled-components";
import COLOR from "../../../public/constant/colors";

export const StyledNav = styled.div`
  width: 100%;
  height: 50px;
  background: ${COLOR.PRIMARY_DARK};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 100;
  overflow: hidden;
`;

export const MenuItem = styled.div`
  display: flex;
  align-self: center;
  color: ${(props) =>
    props.active ? COLOR.PRIMARY_YELLOW : "rgba(246, 190, 15, 0.5)"};
  margin: 0 2rem;
  cursor: pointer;
`;

export const Logo = styled.div`
  position: fixed;
  left: 1.5em;
  @media (max-width: 375px) {
    left: 0.5em;
  }
`;
