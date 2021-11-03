import React from "react";
import { Form, Input } from "antd";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
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
  StyledImage,
  Icon,
  CustomInput,
  StyleInput,
} from "./styled";

const login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Container>
      <ContainerLeft>
        <Logo>
          <StyledImage src="/assets/Logo.svg" width={150} height={150} />
        </Logo>
        <Content>
          <p>I love you as much as</p>
          <p>
            <BoldContent>PONYO</BoldContent>
            loves HAM
          </p>
        </Content>
        <Wave>
          <StyledImage src="/assets/Logo.svg" width={200} height={200} />
        </Wave>
      </ContainerLeft>
      <ContainerRight>
        <Header>Sign in</Header>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <CustomInput>
              <Icon>
                <AiOutlineUser size={18} />
              </Icon>
              <StyleInput type="text" placeholder="Username" />
            </CustomInput>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <CustomInput>
              <Icon>
                <AiOutlineLock size={18} />
              </Icon>
              <StyleInput type="password" placeholder="Password" />
            </CustomInput>
          </Form.Item>
          <Form.Item>
            <Button variant="red" size="large">
              Log in
            </Button>
            <Description>
              First time here?
              <Link href="/register">
                <Path>Sign up!</Path>
              </Link>
            </Description>
          </Form.Item>
        </Form>
      </ContainerRight>
    </Container>
  );
};

export default login;
