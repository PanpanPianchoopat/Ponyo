import styled from "styled-components";
import COLORS from "../../public/constant/colors";
import Image from "next/image";
import BREAKPOINTS from "../../public/constant/breakpoints";

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
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    width: 0%;
  }
`;

export const ContainerRight = styled.div`
  width: 70%;
  background: #f6f5ef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    width: 100%;
  }
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
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 14px;
  }
`;

export const BoldContent = styled.b`
  color: ${COLORS.PRIMARY_YELLOW};
  font-size: 22px;
  letter-spacing: 10px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 18px;
  }
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

export const Icon = styled.i`
  color: #4c403f;
`;

export const CustomInput = styled.div`
  height: 45px;
  width: 30vw;
  background: #f6f5ef;
  border-bottom: 2px solid #87695d;

  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 50vw;
  }
`;

export const StyleInput = styled.input`
  border: none;
  height: 100%;
  background: #f6f5ef;
  width: 23vw;
  margin-left: 10px;
  outline: none;
  font-size: 18px;
  letter-spacing: 2px;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 42vw;
  }
`;
