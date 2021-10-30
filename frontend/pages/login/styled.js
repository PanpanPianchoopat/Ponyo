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
  margin-bottom: 40px;
`;

export const Description = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Path = styled.a`
  margin-left: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  font-size: 18px;
  letter-spacing: 2px;
  margin-right: 20px;
  height: 20%;
`;

export const BoldContent = styled.b`
  color: ${COLORS.PRIMARY_YELLOW};
  font-size: 22px;
  letter-spacing: 10px;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40%;
`;

export const Wave = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  height: 40%;
`;

export const StyledImage = styled(Image)`
  object-fit: contain;
  position: relative;
`;
