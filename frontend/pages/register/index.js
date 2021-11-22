import React, { useState } from "react";
import { Form } from "antd";
import Button from "../../components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import UserAPI from "../api/userAPI.js";
import {
  Container,
  ContainerLeft,
  ContainerRight,
  Header,
  Description,
  Path,
  Content,
  BoldContent,
  Logo,
  Wave,
  LogoImage,
  WaveImage,
  FormContainer,
  LeftSide,
  RightSide,
  Info,
  Center,
  CustomInput,
  StyleInput,
  CustomDatePicker,
  StyleButton,
  CustomButton,
  UploadImage,
  ProfileImage,
  CameraIcon,
  PlusIcon,
} from "./styled";

const register = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = (values) => {
    var profile = null;

    const dateOfBirth = values.birthday.format("YYYY-MM-DD");
    if (values.profile != undefined) {
      profile = values.profile.fileList[0].thumbUrl;
    }

    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      dateOfBirth: dateOfBirth,
      gender: gender,
      image: profile,
    };

    UserAPI.register(data)
      .then((response) => {
        if (response.data.status) {
          router.push("/login");
        }
      })
      .catch((e) => {
        console.log("Already has username or email");
      });
  };

  const [gender, setGender] = useState("");

  const [avatar, setAvatar] = useState("");

  function getBase64(info) {
    const reader = new FileReader();
    reader.addEventListener("load", () => setAvatar(reader.result));
    reader.readAsDataURL(info.file.originFileObj);
  }

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      getBase64(info);
    }
  };

  return (
    <Container>
      <ContainerLeft>
        <Logo>
          <LogoImage src="/assets/Logo.svg" width={150} height={150} />
        </Logo>
        <Content>
          <p>I love you as much as</p>
          <p>
            <BoldContent>PONYO</BoldContent>
            loves HAM
          </p>
        </Content>
        <Wave>
          <WaveImage src="/assets/ponyoWave.svg" layout="fill" />
        </Wave>
      </ContainerLeft>
      <ContainerRight>
        <Header>REGISTER</Header>
        <Form
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <FormContainer>
            <LeftSide>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <CustomInput>
                  <Info>Email</Info>
                  <StyleInput type="text" placeholder="Enter your email" />
                </CustomInput>
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                    whitespace: true,
                  },
                  () => ({
                    validator(_, value) {
                      if (value.length >= 6) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error("6 characters minimum"));
                    },
                  }),
                ]}
              >
                <CustomInput>
                  <Info>Username</Info>
                  <StyleInput type="text" placeholder="Enter your username" />
                </CustomInput>
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  () => ({
                    validator(_, value) {
                      if (value.length < 6) {
                        return Promise.reject(
                          new Error("6 characters minimum")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                  () => ({
                    validator(_, value) {
                      var hasNumber = /\d/;
                      if (hasNumber.test(value) == false) {
                        return Promise.reject(
                          new Error("Must contain one number")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                  () => ({
                    validator(_, value) {
                      var hasUppercase = /[A-Z]/;
                      if (hasUppercase.test(value) == false) {
                        return Promise.reject(
                          new Error("Must contain one uppercase")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                hasFeedback
              >
                <CustomInput>
                  <Info>Password</Info>
                  <StyleInput
                    type="password"
                    placeholder="Enter your password"
                  />
                </CustomInput>
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <CustomInput>
                  <Info>Confirm password</Info>
                  <StyleInput
                    type="password"
                    placeholder="Confirm your password"
                  />
                </CustomInput>
              </Form.Item>
            </LeftSide>
            <RightSide>
              <Form.Item
                name="profile"
                label={
                  <label
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      letterSpacing: "3px",
                      color: "#4c403f",
                      opacity: "0.5",
                      marginBottom: "10px",
                    }}
                  >
                    Upload photo
                  </label>
                }
              >
                <UploadImage
                  listType="picture-card"
                  // beforeUpload={() => false}
                  showUploadList={false}
                  onChange={(info) => handleUpload(info)}
                  maxCount={1}
                >
                  {avatar ? (
                    <ProfileImage src={avatar} />
                  ) : (
                    <>
                      <CameraIcon />
                      <PlusIcon />
                    </>
                  )}
                  {/* <CameraIcon />
                  <PlusIcon /> */}
                </UploadImage>
              </Form.Item>
              <Form.Item
                name="birthday"
                label={
                  <label
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      letterSpacing: "3px",
                      color: "#4c403f",
                      opacity: "0.5",
                      marginBottom: "10px",
                    }}
                  >
                    Birthday
                  </label>
                }
                rules={[
                  {
                    required: true,
                    message: "Please select your birthday!",
                  },
                ]}
              >
                <CustomDatePicker
                  placeholder="DD/MM/YYYY"
                  size="large"
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
              <Form.Item name="gender">
                <>
                  <Info>Gender</Info>
                  <StyleButton>
                    <CustomButton
                      type="button"
                      value="Male"
                      onClick={() => {
                        setGender("male");
                      }}
                    />
                    <CustomButton
                      type="button"
                      value="Female"
                      onClick={() => {
                        setGender("female");
                      }}
                    />
                    <CustomButton
                      type="button"
                      value="Other"
                      onClick={() => {
                        setGender("other");
                      }}
                    />
                  </StyleButton>
                </>
              </Form.Item>
            </RightSide>
          </FormContainer>

          <Form.Item>
            <Center>
              <Button variant="red" size="large">
                REGISTER
              </Button>
            </Center>
            <Description>
              Already has an account?
              <Link href="/login">
                <Path>LOGIN!</Path>
              </Link>
            </Description>
          </Form.Item>
        </Form>
      </ContainerRight>
    </Container>
  );
};

export default register;
