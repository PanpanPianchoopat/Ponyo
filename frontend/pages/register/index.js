import React from "react";
import { Form, Upload } from "antd";
import Button from "../components/Button";
import Link from "next/link";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
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
  CustomRadio,
} from "./styled";

const register = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const dateFormat = "DD/MM/YYYY";
  const setDate = (dateString) => {
    const birthday = dateString;
    console.log(dateString, birthday);
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
        <Header>Sign up</Header>
        <Form
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
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
                name="datePicker"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your birthday!",
                //   },
                // ]}
              >
                <CustomInput>
                  <Info>Birthday</Info>
                  <CustomDatePicker
                    placeholder="DD/MM/YYYY"
                    bordered={false}
                    size="large"
                    format={dateFormat}
                    onChange={(_, dateString) => setDate(dateString)}
                  />
                </CustomInput>
              </Form.Item>
            </LeftSide>
            <RightSide>
              <Form.Item name="upload">
                <Upload
                  name="profile"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={() => false}
                >            
                    <img
                      src="../../public/assets/Logo.svg"
                      alt="profile"
                      style={{ width: "100%" }}
                    />
                </Upload>
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
              <Form.Item
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please select your gender!",
                  },
                ]}
              >
                <CustomRadio.Group buttonStyle="solid" size="large">
                  <Info>Gender</Info>
                  <CustomRadio.Button value="male">Male</CustomRadio.Button>
                  <CustomRadio.Button value="female">Female</CustomRadio.Button>
                  <CustomRadio.Button value="other">Other</CustomRadio.Button>
                </CustomRadio.Group>
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
