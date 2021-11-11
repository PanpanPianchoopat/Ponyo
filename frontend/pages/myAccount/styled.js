import styled from "styled-components";
import { Modal } from "antd";
import COLORS from "../../public/constant/colors";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${COLORS.PRIMARY_LIGHT};
  height: 100%;
`;

export const ProfilePicture = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ListContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  padding-bottom: 50px;
`;

export const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-self: center;
`;

export const Menu = styled.div.attrs((props) => {
  const isActive = props.isSelected;
  const borderStyle = isActive ? `2px solid ${COLORS.PRIMARY_BLUE}` : "none";
  const textColor = isActive ? COLORS.PRIMARY_BLUE : "rgba(2, 133, 143, 0.5)";
  return { borderStyle, textColor };
})`
  border-bottom: ${(props) => props.borderStyle};
  font-size: 1rem;
  width: 50%;
  text-align: center;
  color: ${(props) => props.textColor};
  cursor: pointer;
`;

export const List = styled.div`
  background: ${COLORS.PRIMARY_DARK};
  color: white;
  font-size: 1.2rem;
  padding: 20px;
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
