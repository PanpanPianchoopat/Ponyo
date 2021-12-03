import React from "react";
import { LockContainer, LockIcon, LockText } from "./styled";
import Button from "../Button";
import Router from "next/router";
import { REVIEW, TREND } from "./constant";

const Lock = (props) => {
  const messege =
    props.type == REVIEW
      ? "write review"
      : props.type == TREND
      ? "view trending restaurants"
      : "proceed";
  return (
    <LockContainer>
      <LockIcon src="/assets/lock.svg" />
      <LockText>Please login to {messege}</LockText>
      <Button
        variant="red"
        outline="round"
        onClick={() => Router.push("/login")}
      >
        Login
      </Button>
    </LockContainer>
  );
};

export default Lock;
