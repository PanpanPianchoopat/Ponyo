import React from "react";
import Image from "next/image";
import { LockContainer, LockText } from "./styled";
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
      <Image src="/assets/lock.svg" width={100} height={100} />
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
