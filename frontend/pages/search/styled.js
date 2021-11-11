import styled from "styled-components";
import COLORS from "../../public/constant/colors";
import BREAKPOINTS from "../../public/constant/breakpoints";
import { Input, Select, Radio } from "antd";
import breakpoints from "../../public/constant/breakpoints";

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

export const Name = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
  font-size: 100px;
  font-weight: bold;
  letter-spacing: 40px;
  padding: 60px 0 50px 0;
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
`;

export const Search = styled(Input)`
  width: 40% !important;
  height: 100% !important;
  color: #4c403f;
  background-color: ${COLORS.PRIMARY_LIGHT};
  border: none;
  //border-right: 2px solid #d9ae38 !important;
  padding-left: 20px;
  margin-left: 1px;
  &::placeholder {
    letter-spacing: 2px;
  }
  // &:focus {
  //   border-right: 2px solid #d9ae38 !important;
  // }
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
    //border-right: 2px solid #d9ae38 !important;
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
`;

export const Underline = styled.hr`
  width: 100px;
  margin: 20px auto;
  border: 2px solid ${COLORS.PRIMARY_BLUE};
  border-radius: 10px;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 50px;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 800px;
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
  height: 400px;
  background: ${COLORS.PRIMARY_BLUE};
`;

export const BestRateContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
  background: ${COLORS.PRIMARY_DARK};
`;