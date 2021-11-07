import React from "react";
import { Divider } from "antd";
import { InnerContainer, DetailText, PhoneIcon } from "./styled";

const Detail = () => {
  return (
    <InnerContainer>
      This is Detail
      <Divider />
      <div>
        <PhoneIcon />
        <DetailText>088-8888888</DetailText>
      </div>
    </InnerContainer>
  );
};

export default Detail;
