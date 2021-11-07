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
  Link,
} from "./styled";
import { FaDirections } from "react-icons/fa";

const Detail = (props) => {
  const detail = props.detail;
  return (
    <>
      <InnerContainer>
        <SectionHeader>Detail</SectionHeader>
        {detail.closingDays.length > 0 ? (
          <CloseDays>
            Close every: &ensp;
            {detail.closingDays.map((day, index) => (
              <>
                {day}
                {index < detail.closingDays.length - 1 ? ", " : ""}
              </>
            ))}
          </CloseDays>
        ) : null}
        <DetailText>
          Service hour: {detail.openFrom} - {detail.openTo}
        </DetailText>
        <DetailText style={{ marginTop: "15px" }}>
          <PinIcon />
          {detail.address}
        </DetailText>
        <Direction>
          <FaDirections style={{ marginRight: "5px" }} />
          <Link href={detail.locationLink} target="_blank">
            Direction
          </Link>
        </Direction>
        <Divider />
        <div>
          <PhoneIcon />
          <DetailText>{detail.phone}</DetailText>
        </div>
      </InnerContainer>
    </>
  );
};

export default Detail;
