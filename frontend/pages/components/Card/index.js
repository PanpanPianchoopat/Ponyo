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
} from "./style";
import { Card } from "antd";
import { faBookmark, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farBookMark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import colors from "../../../public/constant/colors";

const { Meta } = Card;

const RestCard = (props) => {
  const [isLiked, setIsLiked] = useState(props.liked);
  const heartButton = isLiked ? (
    <ActiveHeartButton onClick={() => setIsLiked(!isLiked)} />
  ) : (
    <HeartButton onClick={() => setIsLiked(!isLiked)} />
  );
  const [isSaved, setIsSaved] = useState(props.saved);
  const saveButton = isSaved ? (
    <FontAwesomeIcon
      icon={faBookmark}
      style={{ height: "20px" }}
      color={colors.PRIMARY_BLUE}
      onClick={() => setIsSaved(!isSaved)}
    />
  ) : (
    <FontAwesomeIcon
      icon={farBookMark}
      style={{ height: "20px" }}
      onClick={() => setIsSaved(!isSaved)}
    />
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
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          style={{
            height: "14px",
            marginBottom: "2px",
            paddingRight: "5px",
          }}
          color={colors.PRIMARY_RED}
        />
        {props.detail.location}
      </Location>
    </RestaurantCard>
  );
};

export default RestCard;
