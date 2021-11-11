import React from "react";
import { Divider } from "antd";
import {
  InnerContainer,
  SectionHeader,
  CloseDays,
  DetailText,
  PinIcon,
  Direction,
  PhoneIcon,
} from "./styled";
import { FaDirections } from "react-icons/fa";

const Detail = (props) => {
  const detail = props.detail;
  return (
    <>
      <InnerContainer>
        <SectionHeader>Detail</SectionHeader>
        {/* { detail.closingDays.length > 0 ? (
          <CloseDays>
            Close every: &ensp;
            {detail.closingDays.map((day, index) => (
              <text key={index}>
                {day}
                {index < detail.closingDays.length - 1 ? ", " : ""}
              </text>
            ))}
          </CloseDays>
        ) : null} */}
        <DetailText>
          Service hour: {detail ? detail.openTime[0] : 0}:
          {detail ? detail.openTime[1] : 0} - {detail ? detail.closeTime[0] : 0}
          :{detail ? detail.closeTime[1] : 0}
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
