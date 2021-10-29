import styled from "styled-components";
import COLORS from "../../public/constant/colors";
import Image from "next/image";

export const Container = styled.div`
  display: flex;
`;

export const ContainerLeft = styled.div`
  height: 100vh;
  width: 30%;
  background: ${COLORS.PRIMARY_DARK};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 15px;
  font-size: 18px;
  letter-spacing: 2px;
`;

export const ContainerRight = styled.div`
  width: 70%;
  background: #f6f5ef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
    font-weight: bold;
    font-size: 72px;
    color: ${COLORS.PRIMARY_RED};
    letter-spacing: 15px;
    margin-bottom: 40px
`;

export const StyledImage = styled(Image)`
  object-fit: contain;
  width: 20px;
  height: 20px;
`;