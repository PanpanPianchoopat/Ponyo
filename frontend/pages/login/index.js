import React from "react";
import COLORS from "../../public/constant/colors";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {Container, ContainerLeft, ContainerRight, Header, StyledImage,} from "./styled";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Container>
      <ContainerLeft>
          {/* <StyledImage src="/assets/Logo.svg" layout = "fill"/> */}
        <p>I love you as much as</p>
        <p>
          <b
            style={{
              color: COLORS.PRIMARY_YELLOW,
              fontSize: "22px",
              letterSpacing: "10px",
            }}
          >
            PONYO
          </b>
          loves HAM
        </p>
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
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
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
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "350px", height: "40px", background: "#EE2744" }}
            >
              Log in
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              First time here?{" "}
              <a style={{ marginLeft: "10px" }} href="">
                Sign up!
              </a>
            </div>
          </Form.Item>
        </Form>
      </ContainerRight>
    </Container>
  );
};

export default Login;
