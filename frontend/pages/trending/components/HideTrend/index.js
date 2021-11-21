import React from "react";
import { Shadow } from "./styled";
import Lock from "../../../../components/Lock";
import { TREND } from "../../../../components/Lock/constant";

const HideTrend = (props) => {
  return (
    <Shadow visible={props.visible}>
      <Lock type={TREND} />
    </Shadow>
  );
};

export default HideTrend;
