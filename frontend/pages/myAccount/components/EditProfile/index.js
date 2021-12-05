/*******************************************************************************
 * EditProfile component - popup form to edit user's profile
 * 'info'         is current profile data for the user.
 * 'popupVisible' is a function passed from parent to set popup visibility.
 *                Pass true to make popup visible and false to close it.
 ******************************************************************************/

import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import { Form } from "antd";
import { StyledButton } from "../RestList/components/EditList/styled";
import { BsFillPencilFill } from "react-icons/bs";
import UserAPI from "../../../api/userAPI";
import { useRouter } from "next/router";
import {
  USERNAME_LEN,
  PASSWORD_LEN,
} from "../../../../public/constant/account";
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
  const oldPass = props.info ? props.info.password : null;
  const editProfile = props.info ? props.info : null;
  const [avatar, setAvatar] = useState(props.info ? props.info.image : null);
  const router = useRouter();

  /* This function save changes when the form is submited and close the popup.
   * 'value'  is values filled in the form.
   */
  const onFinish = async (value) => {
    /* whether the new password is filled */
    const editPass = value.new_pass !== undefined;
    /* set new password to new password if any */
    const newPassword = editPass
      ? await bcrypt.hash(value.new_pass, 10)
      : oldPass;
    updateProfile(value.username, newPassword);
    props.popupVisible(false);
  };

  /* This function updates user profile data in the database.
   * 'username' is new username.
   * 'password' is new password.
   * It updates user data in local storage and reload page if update completes.
   * Otherwise, it logs the error.
   */
  const updateProfile = (username, password) => {
    var data = {
      username: username,
      password: password,
      image: avatar,
    };

    UserAPI.editProfile(props.info.id, data)
      .then((response) => {
        if (response.data.status) {
          data.id = props.info.id;
          localStorage.setItem("_token", response.data.token);
          router.reload();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /* This function converts photo to base64 and update the profile picture.
   * 'info' is the uploaded file information.
   */
  function getBase64(info) {
    const reader = new FileReader();
    reader.addEventListener("load", () => setAvatar(reader.result));
    reader.readAsDataURL(info.file.originFileObj);
  }

  /* This function handle changes made by the Upload component.
   * 'info' is the uploaded file information.
   */
  const handleUpload = (info) => {
    /* If the file is done uploading, get base64 for the image. */
    if (info.file.status === "done") {
      getBase64(info);
    }
  };

  const [checkOldPass, setCheckOldPass] = useState(null);
  /* This function validates old password field of the form. It checks whether
   * the user has entered password or not. And, whether the entered password
   * matches with the one in the database.
   * 'rule'     is validation rule.
   * 'value'    is old password filled by user.
   * 'callback' is callback function to display feedback message.
   * It sends feedback message to clarify error for the user and set validating
   * status for the old password field.
   */
  const validateOldPass = (rule, value, callback) => {
    if (!value) {
      // If user did not enter old password, told him/her to do so.
      callback("Need password to edit profile");
      setCheckOldPass("warning");
    } else {
      // If old password is entered, compare it to the one in database.
      bcrypt.compare(value, oldPass, function (err, isMatch) {
        if (err) {
          throw err;
        }
        if (isMatch) {
          callback();
          setCheckOldPass("success");
        } else {
          callback("Wrong password");
          setCheckOldPass("error");
        }
      });
    }
  };

  const [checkUsername, setCheckUsername] = useState(null);
  /* This function validates that the username is a valid user name:
   * distinct and contain at least n characters (which is 6 in this case).
   * 'rule'     is validation rule.
   * 'value'    is value in the username field of the form.
   * 'callback' is callback function to display feedback message.
   * It sends feedback message to clarify error for the user and set validating
   * status for username field.
   */
  const validateUsername = (rule, value, callback) => {
    let trimedName = value.trim(); // trim white space
    trimedName = trimedName.replace(/\s+/g, " "); // remove extra spaces

    if (trimedName.length < USERNAME_LEN && value != null) {
      /* If username contains less than 6 characters */
      callback(`Must be at least ${USERNAME_LEN} charaters`);
      setCheckUsername("error");
    } else if (trimedName == props.info.username) {
      /* If username was not changed */
      callback();
      setCheckUsername("success");
    } else {
      UserAPI.checkUsername(trimedName)
        .then((response) => {
          if (response.data) {
            callback();
            setCheckUsername("success");
          } else {
            callback("This username is not available, please try a unique one");
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
        initialValues={{ username: editProfile ? editProfile.username : "" }}
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
                  if (value.length < PASSWORD_LEN) {
                    return Promise.reject(
                      new Error(`Must be at least ${PASSWORD_LEN} characters`)
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
