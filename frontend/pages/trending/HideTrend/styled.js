import styled from "styled-components";

export const Shadow = styled.div.attrs((props) => {
  const display = props.visible ? "flex" : "none";
  return { display };
})`
  display: ${(props) => props.display};
  width: 100%;
  height: 100%;
  background: rgba(46, 56, 64, 0.98);
  align-items: center;
  z-index: 100;
  position: fixed;
`;
