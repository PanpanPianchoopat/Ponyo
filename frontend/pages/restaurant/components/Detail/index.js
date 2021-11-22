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

  const checkTime = (time) => {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

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
        <DetailText>
          Service hour: {checkTime(detail ? detail.openTime[0] : 0)}:
          {checkTime(detail ? detail.openTime[1] : 0)} -{" "}
          {checkTime(detail ? detail.closeTime[0] : 0)}:
          {checkTime(detail ? detail.closeTime[1] : 0)}
        </DetailText>
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
