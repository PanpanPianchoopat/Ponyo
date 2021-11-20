import React from "react";
import CantWrite from "../../restaurant/components/CantWrite";
import { Shadow } from "./styled";

const HideTrend = (props) => {
  return (
    <Shadow visible={props.visible}>
      <CantWrite />
    </Shadow>
  );
};

export default HideTrend;
