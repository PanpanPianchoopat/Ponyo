import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
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
import { StyledButton } from "../RestList/components/EditList/styled";
import UserAPI from "../../../api/userAPI";

const EditProfile = (props) => {
  const oldPass = props.info.password;
  const [editProfile, setEditProfile] = useState(props.info);
  const [avatar, setAvatar] = useState(props.info.image);

  const onFinish = (value) => {
    //console.log(value);
    const editPass = value.new_pass !== undefined;
    const newPassword = editPass ? value.new_pass : oldPass;
    props.setNewProfile({
      username: value.username,
      password: newPassword,
      image: avatar,
    });
    props.popupVisible(false);
  };

  // const editProfile = (value) => {
  //   const data = {
  //     username: value.username,
  //     password
  //   }
  //   UserAPI.editProfile("myInterestRestaurants", user_id)
  //     .then((response) => {
  //       setInList(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  function getBase64(info) {
    const reader = new FileReader();
    reader.addEventListener("load", () => setAvatar(reader.result));
    reader.readAsDataURL(info.file.originFileObj);
  }

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      console.log("PIC", info);
      getBase64(info);
    }
  };

  const [checkOldPass, setCheckOldPass] = useState(null);
  const validateOldPass = async (rule, value, callback) => {
    const isPasswordValid = await bcrypt.compare(value, oldPass);

    if (!value) {
      callback("Need password to edit profile");
      setCheckOldPass("warning");
    } else if (isPasswordValid) {
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
      UserAPI.checkUsername(trimedName)
        .then((response) => {
          if (response.data) {
            callback();
            setCheckUsername("success");
          } else {
            callback("This username already has");
            setCheckUsername("error");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      <Form
        labelCol={{ span: 9 }}
        onFinish={onFinish}
        initialValues={{ username: editProfile.username }}
      >
        <Form.Item name="avatar">
          <ImageWrapper>
            <UploadAvatar
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={(info) => handleUpload(info)}
              maxCount={1}
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
                if (value != null) {
                  if (value.length < 6) {
                    return Promise.reject(
                      new Error("Must be at least 6 characters")
                    );
                  }
                }
                return Promise.resolve();
              },
            }),
            () => ({
              validator(_, value) {
                const containNum = /\d/.test(value);
                if (value != null) {
                  if (!containNum) {
                    return Promise.reject(new Error("Must contain a number"));
                  }
                }
                return Promise.resolve();
              },
            }),
            () => ({
              validator(_, value) {
                const containUpperCase = /[A-Z]/.test(value);
                if (value != null) {
                  if (!containUpperCase) {
                    return Promise.reject(
                      new Error("Must contain an uppercase")
                    );
                  }
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <PasswordField bordered={false} placeholder="optional" />
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
          <PasswordField bordered={false} placeholder="optional" />
        </FormItem>
        <FormItem>
          <ButtonGroup>
            <StyledButton
              variant="transparent"
              outline="round"
              style={{ marginRight: "20px" }}
              onClick={() => props.popupVisible(false)}
            >
              Cancel
            </StyledButton>
            <StyledButton variant="green" outline="round" type="submit">
              Save
            </StyledButton>
          </ButtonGroup>
        </FormItem>
      </Form>
    </div>
  );
};

export default EditProfile;
