import styled from "styled-components";
import { Modal } from "antd";
import COLORS from "../../../../public/constant/colors";
import { FAVOURITE } from "../../../../public/constant/myAccount";
import BREAKPOINTS from "../../../../public/constant/breakpoints";
import { LoadingOutlined } from "@ant-design/icons";

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
    padding: 0 20px 20px 20px;
  }
`;

export const EmptyList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0;
  width: 100%;
`;

export const EmptyTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0;
  color: ${COLORS.LIGHT_GREY};
`;

export const LoadingIcon = styled(LoadingOutlined)`
  font-size: 30px;
  color: ${COLORS.PRIMARY_YELLOW};
`;

export default CardsWrapper;
