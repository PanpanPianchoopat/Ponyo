import React from "react";
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
    >
      <Line>
        <RestaurantName>
          {restName
            ? restName.length > 15
              ? `${restName.substring(0, 15)}...`
              : restName
            : null}
        </RestaurantName>
        <PriceRange>฿{priceRange}</PriceRange>
      </Line>
      <Line>
        <Description>
          {description
            ? description.length > 25
              ? `${description.substring(0, 25)}...`
              : description
            : null}
        </Description>
        <Rating>
          <Star />
          {rating}
        </Rating>
      </Line>

      {location ? (
        <Location>
          <PinIcon />
          {location.length > 32 ? `${location.substring(0, 32)}...` : location}
        </Location>
      ) : null}
    </RestaurantCard>
  );
};

export default RestCard;
