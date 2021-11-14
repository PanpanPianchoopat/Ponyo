import styled from "styled-components";
import { Modal } from "antd";
import COLORS from "../../../../public/constant/colors";
import { FAVOURITE } from "../../constant";
import BREAKPOINTS from "../../../../public/constant/breakpoints";

export const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 0;
  height: 1000px;
  overflow-y: auto;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    height: 700px;
  }
`;

export const HeaderWrapper = styled.div.attrs((props) => {
  const marginStyle = props.headerType == FAVOURITE ? "15px" : "20px";
  return { marginStyle };
})`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: ${(props) => props.marginStyle};
`;

export const ListHeader = styled.h4`
  font-size: 1.2rem;
  margin: 0 0 0 3vw;
  color: white;
`;

export const EditButton = styled.button.attrs((props) => {
  const buttonVisible = props.visible ? "flex" : "none";
  return { buttonVisible };
})`
  display: ${(props) => props.buttonVisible};
  align-items: center;
  padding: 0 20px;
  border: 1px solid ${COLORS.LIGHT_GREY};
  background: none;
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    filter: brightness(0.8);
  }
`;

export const Popup = styled(Modal)`
  .ant-modal-header {
    border: 0;
    padding: 20px 20px 0 20px;
  }
  .ant-modal-title {
    font-size: 24px;
    margin: 10px 0;
  }
  .ant-modal-body {
    padding: 0 20px;
  }
  .ant-modal-footer {
    display: flex;
    justify-content: center;
    border: 0;
    padding: 0 0 20px 0;
  }
  .ant-btn {
    border: 1px solid ${COLORS.LIGHT_GREY};
    border-radius: 50px;
    width: 100px;
    color: ${COLORS.DARK_GREY};
    margin: 0 25px;
    &:hover {
      filter: brightness(0.9);
    }
  }
  .ant-btn-primary {
    background: ${COLORS.LIGHT_GREEN};
    border: none;
    color: white;
  }
`;
