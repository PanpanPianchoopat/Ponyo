import styled from "styled-components";
import { Modal } from "antd";
import COLORS from "../../public/constant/colors";

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
