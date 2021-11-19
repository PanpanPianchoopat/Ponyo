import React, { useState, useEffect } from "react";
import { Form, Input, Upload, Avatar } from "antd";
import Button from "../../../components/Button";

import { BsFillPencilFill, BsPersonFill } from "react-icons/bs";
import {
  UploadAvatar,
  FormItem,
  ImageWrapper,
  ProfileImage,
  DefaultImage,
  EditIcon,
  InputField,
  PasswordField,
  ButtonGroup,
} from "./styled";

const EditProfile = (props) => {
  const [profile, setProfile] = useState({
    name: "Aang The Last Air Bender",
    avatar:
      "https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/01/4-avatar-aang.jpg",
    password: "123",
  });
  const [avatar, setAvatar] = useState(profile.avatar);
  const fileList = [];
  const onFinish = (value) => {
    console.log(value);
    setAvatar(value.avatar.fileList[0].thumbUrl);
  };

  function getBase64(img) {
    const reader = new FileReader();
    reader.addEventListener("load", () => setAvatar(reader.result));
    reader.readAsDataURL(img);
  }

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj);
    }
  };

  // useEffect(() => {
  //   console.log("PIC", avatar);
  // }, [avatar]);

  const [checkOldPass, setCheckOldPass] = useState(null);
  const validateOldPass = (rule, value, callback) => {
    if (!value) {
      callback();
      setCheckOldPass(null);
    } else if (value === profile.password) {
      callback();
      setCheckOldPass("success");
    } else {
      callback("Wrong password");
      setCheckOldPass("error");
    }
  };

  const [checkUsername, setCheckUsername] = useState(null);
  const validateUsername = (rule, value, callback) => {
    let trimedName = value.trim();
    trimedName = trimedName.replace(/\s+/g, " ");
    if (trimedName.length < 6 && value != null) {
      callback("Must contain more than 6 charaters");
      setCheckUsername("error");
    } else {
      // validate distinct username
      callback();
      setCheckUsername("success");
    }
  };

  return (
    <div>
      <Form
        labelCol={{ span: 8 }}
        onFinish={onFinish}
        initialValues={{ username: profile.name }}
      >
        <Form.Item name="avatar">
          <ImageWrapper>
            <UploadAvatar
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={(info) => handleUpload(info)}
            >
              {avatar ? <ProfileImage src={avatar} /> : <DefaultImage />}
            </UploadAvatar>
            <EditIcon>
              <BsFillPencilFill />
            </EditIcon>
          </ImageWrapper>
        </Form.Item>
        <FormItem
          name="username"
          label="Username"
          hasFeedback
          validateStatus={checkUsername}
          rules={[{ validator: validateUsername }]}
        >
          <InputField />
        </FormItem>
        <FormItem
          name="old_pass"
          label="Current password"
          hasFeedback
          validateStatus={checkOldPass}
          rules={[{ validator: validateOldPass }]}
        >
          <PasswordField bordered={false} />
        </FormItem>
        <FormItem
          name="new_pass"
          label="New password"
          hasFeedback
          rules={[
            () => ({
              validator(_, value) {
                if (value.length < 6) {
                  return Promise.reject(
                    new Error("Must be at least 6 characters")
                  );
                }
                return Promise.resolve();
              },
            }),
            () => ({
              validator(_, value) {
                const containNum = /\d/.test(value);
                if (!containNum) {
                  return Promise.reject(new Error("Must contain a number"));
                }
                return Promise.resolve();
              },
            }),
            () => ({
              validator(_, value) {
                const containUpperCase = /[A-Z]/.test(value);
                if (!containUpperCase) {
                  return Promise.reject(new Error("Must contain an uppercase"));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <PasswordField bordered={false} />
        </FormItem>
        <FormItem
          name="new_pass_confirm"
          label="Corfirm password"
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const isMatching = value === getFieldValue("new_pass");
                if (!isMatching) {
                  return Promise.reject(new Error("Password doesn't match"));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <PasswordField bordered={false} />
        </FormItem>
        <FormItem>
          <ButtonGroup>
            <Button
              variant="transparent"
              outline="round"
              style={{ width: "100px", marginRight: "20px" }}
              onClick={props.closePopup}
            >
              Cancel
            </Button>
            <Button
              variant="green"
              outline="round"
              type="submit"
              style={{ width: "100px" }}
              onClick={props.closePopup}
            >
              Save
            </Button>
          </ButtonGroup>
        </FormItem>
      </Form>
    </div>
  );
};

export default EditProfile;
