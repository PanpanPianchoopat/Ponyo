import React, { useEffect, useRef, useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

import { Login, setSubmitState } from "../../slices/auth";
import { useRouter } from "next/router";
import { Form, message } from "antd";
import Button from "../../components/Button";
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

const Signin = () => {
  const initialRender = useRef(true);
  const [validateState, setValidateState] = useState(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLogin, isSubmit } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isSubmit) {
      if (isLogin) {
        setValidateState("success");
        router.push("/search");
      } else {
        dispatch(setSubmitState());
        if (initialRender.current) {
          initialRender.current = false;
        } else {
          setValidateState("error");
          message.error("Invalid email/password");
        }
      }
    }
  }, [isSubmit]);

  const auth = (val) => {
    setValidateState("validating");
    const credential = {
      email: val.email,
      password: val.password,
    };
    dispatch(Login(credential));
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
        <Header>LOGIN</Header>
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
            validateStatus={validateState}
            hasFeedback
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
            validateStatus={validateState}
            hasFeedback
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
                LOGIN
              </Button>
            </MarginBox>

            <Description>
              First time here?
              <Link href="/register">
                <Path>REGISTER.</Path>
              </Link>
            </Description>
          </Form.Item>
        </Form>
      </ContainerRight>
    </Container>
  );
};

export default Signin;
