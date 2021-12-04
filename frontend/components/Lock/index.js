/*******************************************************************************
 * Lock component - lock some section for non-login users
 * 'type' specifies type of lock. It can be REVIEW and TREND constant or other
 *        values. It is used to determine lock message.
 ******************************************************************************/

import React from "react";
import { LockContainer, LockIcon, LockText } from "./styled";
import Button from "../Button";
import Router from "next/router";
import { REVIEW, TREND } from "./constant";

const Lock = (props) => {
  const reviewLockText = "write review";
  const trendingLockText = "view trending restaurants";
  const defaultLockText = "proceed";

  /* Set lock message according to lock type */
  const message =
    props.type == REVIEW
      ? reviewLockText
      : props.type == TREND
      ? trendingLockText
      : defaultLockText;

  return (
    <LockContainer>
      <LockIcon src="/assets/lock.svg" />
      <LockText>Please login to {message}</LockText>
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
