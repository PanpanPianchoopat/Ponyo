import styled from "styled-components";
import COLORS from "../../public/constant/colors";
import Image from "next/image";
import { DatePicker, Upload } from "antd";
import { CameraFilled, PlusCircleFilled } from "@ant-design/icons";
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
  text-shadow: 0px 5px 7px #91a0a5;
  color: ${COLORS.PRIMARY_RED};
  letter-spacing: 15px;
  margin-bottom: 40px;
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

export const Description = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  letter-spacing: 1.5px;
`;

export const Path = styled.a`
  margin-left: 10px;
`;

export const Logo = styled.div`
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

export const LogoImage = styled(Image)`
  object-fit: contain;
  position: relative;
`;

export const WaveImage = styled(Image)`
  object-fit: contain;
  position: relative;
  top: 150px !important;
  left: -250px !important;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60vw;
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    width: 100vw;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    width: 30%;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    width: 40%;
  }
`;

export const Info = styled.div`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 3px;
  color: #4c403f;
  opacity: 0.5;
  margin-bottom: 10px;
  @media (max-width: 893px) {
    font-size: 15px;
  }
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;

export const CustomInput = styled.div`
  width: 23vw;
  background: #f6f5ef;
  border-bottom: 2px solid #87695d;
  margin-bottom: 5px;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 50vw;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    width: 30vw;
  }
`;

export const StyleInput = styled.input`
  border: none;
  height: 100%;
  background: #f6f5ef;
  width: 23vw;
  outline: none;
  font-size: 18px;
  letter-spacing: 2px;
  padding: 0 0 8px 12px;
  &::placeholder {
    color: ${COLORS.LIGHT_GREY};
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 42vw;
  }
`;

export const CustomDatePicker = styled(DatePicker)`
  height: 100%;
  background: #f6f5ef;
  width: 23vw;
  font-size: 22px;
  border: none;
  border-bottom: 2px solid #87695d;
`;

export const StyleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  width: 23vw;
  height: 6vh;
  border-radius: 5px;
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    width: 39vw;
  }
`;

export const CustomButton = styled.input`
  width: 30%;
  border-radius: 5px;
  background: white;
  border: 0;
  color: black;
  padding: 5px 20px;
  &:hover {
    background: #ecd89d;
  }
  &:active {
    transform: translateY(2px);
  }
  &:focus {
    background: #ecd89d;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    width: 40%;
  }
`;

export const UploadImage = styled(Upload)`
  .ant-upload-list-picture-card-container {
    width: 80px;
    height: fit-content;
    margin: 0;
  }
  .ant-upload-select,
  .ant-upload-select:hover {
    border-radius: 100px;
    border: 1.5px dashed #6ba59c;
    width: 60px;
    height: 60px;
    background: white;
  }
  .ant-upload-list-item,
  .ant-upload-list-item-info {
    border-radius: 100px;
    width: 60px;
    height: 60px;
    padding: 0;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  .ant-upload-list-item-info::before {
    left: 0;
  }
`;

export const CameraIcon = styled(CameraFilled)`
  font-size: 25px;
  color: #2e3840;
`;

export const PlusIcon = styled(PlusCircleFilled)`
  font-size: 15px;
  color: #6ba59c;
  position: absolute;
  margin: 40px 0 0 40px;
  background: white;
  border-radius: 100px;
`;
