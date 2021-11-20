import React from "react";
import Image from "next/image";
import { LockContainer, LockText } from "./styled";
import Button from "../../../components/Button";
import Router from "next/router";

const CantWrite = () => {
  return (
    <LockContainer>
      <Image src="/assets/lock.svg" width={100} height={100} />
      <LockText>Please Login to Review</LockText>
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

export default CantWrite;
