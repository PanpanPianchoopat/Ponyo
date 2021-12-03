import styled from "styled-components";
import COLORS from "../../public/constant/colors";
import Image from "next/image";
import BREAKPOINTS from "../../public/constant/breakpoints";

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
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
  overflow: hidden;
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
  text-shadow: 0px 5px 7px #91a0a5;
  color: ${COLORS.PRIMARY_RED};
  letter-spacing: 15px;
  margin-bottom: 40px;
`;

export const Description = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  letter-spacing: 2px;
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
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40%;
`;

export const Wave = styled.div`
  position: relative;
  width: 100%;
  height: 40%;
`;

export const LogoImage = styled.img`
  width: 40%;
`;

export const WaveImage = styled.img`
  position: absolute;
  width: 110%;
  bottom: -60%;
  left: -40%;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    width: 120%;
    bottom: -30%;
  }
  @media (max-width: ${BREAKPOINTS.HiDPI_LAPTOP}) {
    bottom: -20%;
  }
  @media (max-width: ${BREAKPOINTS.MDPI_LAPTOP}) {
    bottom: -10%;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    width: 130%;
    bottom: -5%;
  }
`;

export const Icon = styled.i`
  color: #4c403f;
`;

export const MarginBox = styled.div`
  margin-top: 20px;
`;

export const CustomInput = styled.div`
  height: 45px;
  width: 30vw;
  background: #f6f5ef;
  border-bottom: 2px solid #87695d;
  margin-bottom: 5px;
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

export default Container;
