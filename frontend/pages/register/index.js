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

const register = () => {
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
      <Header>Sign up</Header>
      </ContainerRight>
    </Container>
  );
};

export default register;
