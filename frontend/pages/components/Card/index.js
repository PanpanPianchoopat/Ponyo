import React, { useState } from "react";
import {
  RestaurantCard,
  ActiveHeartButton,
  HeartButton,
  CommentButton,
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
  BookmarkButton,
  ActiveBookmark,
  PinIcon,
} from "./style";

const RestCard = (props) => {
  const [isLiked, setIsLiked] = useState(props.liked);
  const heartButton = isLiked ? (
    <ActiveHeartButton onClick={() => setIsLiked(!isLiked)} />
  ) : (
    <HeartButton onClick={() => setIsLiked(!isLiked)} />
  );
  const [isSaved, setIsSaved] = useState(props.saved);
  const saveButton = isSaved ? (
    <ActiveBookmark onClick={() => setIsSaved(!isSaved)} />
  ) : (
    <BookmarkButton onClick={() => setIsSaved(!isSaved)} />
  );

  return (
    <RestaurantCard
      cover={
        <CoverContainer>
          <Status status={props.detail.status}>
            {props.detail.status.toUpperCase()}
          </Status>
          <CoverPhoto src={props.detail.cover} />
        </CoverContainer>
      }
      actions={[heartButton, <CommentButton />, saveButton]}
      bordered={false}
    >
      <Line>
        <RestaurantName>{props.detail.name}</RestaurantName>
        <PriceRange>฿ {props.detail.price} .-</PriceRange>
      </Line>
      <Line>
        <Description>{props.detail.description}</Description>
        <Rating>
          <Star />
          {props.detail.rate}
        </Rating>
      </Line>

      <Location>
        <PinIcon />
        {props.detail.location}
      </Location>
    </RestaurantCard>
  );
};

export default RestCard;
