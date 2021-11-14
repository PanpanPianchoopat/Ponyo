import React from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  RestaurantCard,
  IconWrapper,
  Ranking,
  Location,
  Line,
  RestaurantName,
  PriceRange,
  Description,
  Rating,
  CoverPhoto,
  CoverContainer,
  DetailContainer,
  LeftSection,
  RightSection,
  Star,
  Status,
  PinIcon,
} from "./styled";

const RestCard = ({ ...props }) => {
  const restName = props.detail.name;
  const description = props.detail.description;
  const priceRange = props.detail.price;
  const rating = props.detail.rate;
  const location = props.detail.location;
  const restStatus = props.detail.status;
  const restPicture = props.detail.cover;
  const restRank = props.detail.rank;

  return (
    <RestaurantCard
      size={props.size}
      headStyle={{ display: props.showRank ? "flex" : "none" }}
      bordered={false}
      title={<Ranking showRank={props.showRank}>{restRank}</Ranking>}
      cover={
        <CoverContainer customSize={props.size}>
          <IconWrapper>
            {restStatus ? (
              <Status status={restStatus}>{restStatus.toUpperCase()}</Status>
            ) : null}
          </IconWrapper>
          <CoverPhoto src={restPicture} />
        </CoverContainer>
      }
      style={{ margin: props.showRank ? "0 0.5vw" : "10px 0.5vw" }}
    >
      <DetailContainer>
        <LeftSection>
          <RestaurantName>
            {restName
              ? restName.length > 20
                ? `${restName.substring(0, 20)}...`
                : restName
              : null}
          </RestaurantName>
          <Description>
            {description
              ? description.length > 60
                ? `${description.substring(0, 60)}...`
                : description
              : null}
          </Description>
        </LeftSection>
        <RightSection>
          <PriceRange>฿{priceRange}</PriceRange>
          <Rating>
            <Star />
            {rating}
          </Rating>
        </RightSection>
      </DetailContainer>

      {location ? (
        <Location>
          <PinIcon />
          {location.length > 25 ? `${location.substring(0, 25)}...` : location}
        </Location>
      ) : null}
    </RestaurantCard>
  );
};

export default RestCard;
