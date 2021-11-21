import styled from "styled-components";
import { Input, Upload, Form, Avatar } from "antd";
import COLORS from "../../../../public/constant/colors";
import { BsPersonFill } from "react-icons/bs";

export const FormItem = styled(Form.Item)`
label {
  color rgba(76, 64, 63, 0.6);
  font-size: 1rem;
}
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled(Avatar)`
  width: 100%;
  height: 100%;
`;

export const DefaultImage = styled(BsPersonFill)`
  color: ${COLORS.LIGHT_GREY};
  font-size: 50px;
`;

export const EditIcon = styled.span`
  position: absolute;
  display: flex;
  background: #ff8a00;
  padding: 5px;
  margin: 15% 0 0 55%;
  borderradius: 50px;
  color: white;
  border-radius: 50px;
  font-size: 12px;
`;

export const InputField = styled(Input)`
  width: 100%;
  border: none;
  border-bottom: 2px solid #c4c4c4;
  font-size: 1rem;
  &:focus {
    box-shadow: none;
    border-bottom: 2px solid #c4c4c4;
  }
`;

export const PasswordField = styled(Input.Password)`
  border-bottom: 2px solid #c4c4c4;
  &:hover {
    border: none;
    border-bottom: 2px solid ${COLORS.PRIMARY_YELLOW};
  }
`;

export const UploadAvatar = styled(Upload)`
  display: flex;
  justify-content: center;
  position: relative;
  .ant-upload {
    background: white;
    border-radius: 200px;
    border: 1px solid ${COLORS.LIGHT_GREY};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
`;

export default FormItem;
