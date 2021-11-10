import styled from "styled-components";
import COLORS from "../../public/constant/colors";
import BREAKPOINTS from "../../public/constant/breakpoints";
import { Input, Select } from "antd";

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
  display: flex;
  background: ${COLORS.PRIMARY_LIGHT};
  margin-bottom: 100px;
  border-radius: 50px;
  box-shadow: 0px 5px 10px black;
`;

export const Search = styled(Input)`
  width: 40% !important;
  height: 100% !important;
  color: #4c403f;
  background-color: ${COLORS.PRIMARY_LIGHT};
  border: none;
  border-right: 2px solid #d9ae38 !important;
  padding-left: 20px;
  margin-left: 1px;
  &::placeholder {
    letter-spacing: 2px;
  }
  &:focus {
    border-right: 2px solid #d9ae38 !important;
  }
`;

export const Selecter = styled(Select)`
  width: 15%;
  height: 100%;
  text-align: center;
  margin-left: 1px;
  color: #4c403f;
  .ant-select-selector {
    background-color: ${COLORS.PRIMARY_LIGHT} !important;
    border: none !important;
    border-right: 2px solid #d9ae38 !important;
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
