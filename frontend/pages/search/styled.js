import styled from "styled-components";
import COLORS from "../../public/constant/colors";
import BREAKPOINTS from "../../public/constant/breakpoints";
import { Input, Select, Radio, Image } from "antd";
import { SmileOutlined } from "@ant-design/icons";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeadSection = styled.div`
  width: 100%;
  background: ${COLORS.PRIMARY_DARK};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NameImage = styled(Image)`
  object-fit: contain;
  width: 700px;
  padding: 60px 0 50px 0;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    width: 600px;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    width: 400px;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 300px;
  }
`;

export const SearchBar = styled.div`
  width: 80%;
  height: 50px;
  display: flex;
  background: ${COLORS.PRIMARY_LIGHT};
  margin-bottom: 70px;
  border-radius: 50px;
  box-shadow: 0px 5px 10px black;
  .ant-input-group {
    height: 100% !important;
    .ant-select-lg {
      height: 100% !important;
    }
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    width: 85%;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_PORTRAIT}) {
    width: 90%;
  }
`;

export const Search = styled(Input)`
  width: 40% !important;
  height: 100% !important;
  color: #4c403f;
  background-color: ${COLORS.PRIMARY_LIGHT};
  border: none;
  padding-left: 20px;
  margin-left: 1px;
  &::placeholder {
    letter-spacing: 2px;
  }
`;

export const Selecter = styled(Select)`
  width: 15%;
  text-align: center;
  padding-top: 5px;
  margin-left: 1px;
  color: #4c403f;
  .ant-select-selector {
    height: 100% !important;
    background-color: ${COLORS.PRIMARY_LIGHT} !important;
    border: none !important;
    border-radius: 50px 0 0 50px !important;
  }
`;

export const StyleButton = styled.button`
  height: 80%;
  width: 10%;
  border: none;
  background: ${COLORS.PRIMARY_RED};
  border-radius: 50px !important;
  color: white;
  margin: 4px 0 0 25px;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    filter: brightness(0.9);
  }
`;

export const ContentName = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #14454b;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 5px;
  margin-top: 70px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 26px;
    margin-top: 50px;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    font-size: 16px;
    margin-top: 30px;
  }
`;

export const Underline = styled.hr`
  width: 100px;
  margin: 20px auto;
  border: 2px solid ${COLORS.PRIMARY_BLUE};
  border-radius: 10px;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 50px;
    margin: 10px auto 25px auto;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatusBox = styled.div`
  width: 80%;
  letter-spacing: 1px;
  .ant-radio-checked .ant-radio-inner {
    border-color: ${COLORS.PRIMARY_BLUE} !important ;
  }

  .ant-radio-checked .ant-radio-inner:after {
    background-color: ${COLORS.PRIMARY_BLUE};
  }

  .ant-radio:hover .ant-radio-inner {
    border-color: ${COLORS.PRIMARY_BLUE};
  }
`;

export const Status = styled(Radio)``;

export const CardContainer = styled.div`
  width: 80%;
  margin: 30px 0 50px 0;
  height: 800px;
  overflow-y: scroll;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    height: 650px;
  }
  @media (max-width: ${BREAKPOINTS.HiDPI_LAPTOP}) {
    height: 500px;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    height: 400px;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    height: auto;
  }
`;

export const Loading = styled.p`
  font-size: 20px;
`;

export const SmileIcon = styled(SmileOutlined)`
  color: ${COLORS.PRIMARY_YELLOW};
  margin-right: 10px;
  font-size: 50px;
`;

export const BestRateContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding-bottom: 80px;
  background: ${COLORS.PRIMARY_DARK};
`;

export default Container;
