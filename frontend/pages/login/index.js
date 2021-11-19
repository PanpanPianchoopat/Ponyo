import React from "react";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

import { Login } from "../../slices/auth";
import { useRouter } from "next/router";

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
  LogoImage,
  WaveImage,
  Icon,
  MarginBox,
  CustomInput,
  StyleInput,
} from "./styled";
import UserAPI from "../api/userAPI";

const Signin = () => {
  const router = useRouter();
  // const auth = (values) => {
  //   const data = {
  //     email: values.email,
  //     password: values.password,
  //   };

  //   UserAPI.login(data)
  //     .then((response) => {
  //       console.log("user ", response.data.user);
  //       localStorage.setItem("token", response.data.user);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       console.log("Username or password not correct");
  //     });
  // };

  const auth = (val) => {
    const credential = {
      email: val.email,
      password: val.password,
    };
    dispatch(Login(credential));
    router.push("/restaurant");
  };

  const dispatch = useAppDispatch();

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
        <Header>Sign in</Header>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={auth}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <CustomInput>
              <Icon>
                <AiOutlineUser size={18} />
              </Icon>
              <StyleInput type="text" placeholder="Email" />
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
            <MarginBox>
              <Button variant="red" size="large">
                Log in
              </Button>
            </MarginBox>

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

export default Signin;
