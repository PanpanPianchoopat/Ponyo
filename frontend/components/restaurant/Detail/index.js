/*******************************************************************************
 * Detail component - restaurant's detailed information.
 * 'detail' is detail of the restaurant.
 ******************************************************************************/

import React from "react";
import { Divider } from "antd";
import { FaDirections } from "react-icons/fa";
import {
  InnerContainer,
  SectionHeader,
  CloseDays,
  DetailText,
  PinIcon,
  Direction,
  PhoneIcon,
} from "./styled";

const Detail = (props) => {
  const detail = props.detail;

  /* This function converts time into nn format if needed.
   * 'num' is time integer
   * It returns time in nn format.
   */
  function getTimeString(num) {
    /* If time is a single integer, add zero in front of it. */
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  /* This function calculates service time in hh:mm - hh:mm format.
   * 'openTime'   is an array of restaurant's opening time for hour and min.
   * 'closeTime'  is an array of restaurant's closing time for hour and min.
   * It returns restaurant's service time with the hh:mm - hh:mm format.
   */
  function getServiceTime(openTime, closeTime) {
    const HOUR = 0; // first element of array is hour
    const MINUTE = 1; // second element of array is minute
    let openHour = getTimeString(openTime[HOUR]);
    let openMin = getTimeString(openTime[MINUTE]);
    let closeHour = getTimeString(closeTime[HOUR]);
    let closeMin = getTimeString(closeTime[MINUTE]);

    return `${openHour}:${openMin} - ${closeHour}:${closeMin}`;
  }

  return (
    <>
      <InnerContainer>
        <SectionHeader>Detail</SectionHeader>
        {(detail ? detail.closeDay.length : null) > 0 ? (
          <CloseDays>
            Close every: &ensp;
            {detail ? detail.closeDay : null}
          </CloseDays>
        ) : null}
        {detail && (
          <DetailText>
            Service hour: {getServiceTime(detail.openTime, detail.closeTime)}
          </DetailText>
        )}
        <DetailText style={{ marginTop: "15px" }}>
          <PinIcon />
          {detail ? detail.details.location.address : ""}
        </DetailText>
        <Direction
          href={detail ? detail.details.location.ggLink : ""}
          target="_blank"
        >
          <FaDirections style={{ marginRight: "5px" }} />
          Direction
        </Direction>

        <Divider />
        <div>
          <PhoneIcon />
          <DetailText>{detail ? detail.details.phone : ""}</DetailText>
        </div>
      </InnerContainer>
    </>
  );
};

export default Detail;
