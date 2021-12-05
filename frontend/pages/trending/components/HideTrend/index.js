/*******************************************************************************
 * HideTrend component - lock trending page for non-login users.
 * 'visible'  is visibility of this component. If it is set to true, lock is
 *            disabled and the page is visible. Otherwise, the page is lock to
 *            hide trending restaurant.
 ******************************************************************************/

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
