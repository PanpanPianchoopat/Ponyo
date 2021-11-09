import React, { useState } from "react";
import { Form } from "antd";
import Button from "../components/Button";
import Link from "next/link";
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
  CameraIcon,
  PlusIcon,
} from "./styled";

const register = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    console.log("Received values of form: ", gender);
  };
  const setDate = (dateString) => {
    const birthday = dateString;
    console.log(dateString, birthday);
  };

  const [gender, setGender] = useState("");

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
        <Header>Sign up</Header>
        <Form
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
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
              >
                <CustomDatePicker
                  placeholder="DD/MM/YYYY"
                  size="large"
                  format={"DD/MM/YYYY"}
                  onChange={(_, dateString) => setDate(dateString)}
                />
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
                  beforeUpload={() => false}
                  showUploadList={{ showPreviewIcon: false }}
                  maxCount={1}
                >
                  <CameraIcon />
                  <PlusIcon />
                </UploadImage>
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
                <CustomInput style={{ marginTop: "57px" }}>
                  <Info>Confirm password</Info>
                  <StyleInput
                    type="password"
                    placeholder="Confirm your password"
                  />
                </CustomInput>
              </Form.Item>
              <Form.Item name="gender">
                <>
                  <Info>Gender</Info>
                  <StyleButton>
                    <CustomButton
                      onClick={() => {
                        setGender("male");
                      }}
                    >
                      Male
                    </CustomButton>
                    <CustomButton
                      onClick={() => {
                        setGender("female");
                      }}
                    >
                      Female
                    </CustomButton>
                    <CustomButton
                      onClick={() => {
                        setGender("other");
                      }}
                    >
                      Other
                    </CustomButton>
                  </StyleButton>
                </>
              </Form.Item>
            </RightSide>
          </FormContainer>

          <Form.Item>
            <Center>
              <Button variant="red" size="large">
                SIGN UP
              </Button>
            </Center>
            <Description>
              Not the first time here?
              <Link href="/login">
                <Path>Sign in!</Path>
              </Link>
            </Description>
          </Form.Item>
        </Form>
      </ContainerRight>
    </Container>
  );
};

export default register;
