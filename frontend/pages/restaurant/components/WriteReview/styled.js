import styled from "styled-components";
import { Rate, Upload } from "antd";
import COLORS from "../../../../public/constant/colors";
import BREAKPOINTS from "../../../../public/constant/breakpoints";
import { CameraFilled, PlusCircleFilled } from "@ant-design/icons";

export const WriteReviewInnnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  margin: 20px 20px 0 20px;
`;

export const SectionHeader = styled.b`
  font-size: 20px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 18px;
  }
`;

export const StyledRate = styled(Rate)`
  font-size: 35px;
  color: ${COLORS.PRIMARY_YELLOW};
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 28px;
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

export const UploadInfo = styled.p`
  color: ${COLORS.DARK_GREY};
  font-size: 10px;
  margin: 10px 0 0 0;
`;

export const FullList = styled.p.attrs((props) => {
  const displayStyle = props.visible ? "unset" : "none";
  return { displayStyle };
})`
  display: ${(props) => props.displayStyle};
  color: ${COLORS.PRIMARY_RED};
  font-size: 10px;
  margin-top: 0;
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

export const StyledInput = styled.textarea`
  background: ${COLORS.PRIMARY_LIGHT};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 100px;
  width: 80%;
  resize: none;
  padding: 10px;
`;

export const ButtonGroup = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

export default WriteReviewInnnerContainer;
