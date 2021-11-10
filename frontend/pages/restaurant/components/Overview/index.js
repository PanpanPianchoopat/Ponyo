import React, { useState, useEffect } from "react";
import {
  OverviewContainer,
  RestName,
  Status,
  Line,
  Inline,
  Bookmark,
  BookmarkActive,
  PriceRange,
  Record,
  AverageRate,
  AvgRateText,
  Heart,
  HeartACtive,
} from "./styled";
import { Divider } from "antd";

const Overview = (props) => {
  const restaurant = props.info;
  const isOpen = props.status;
  const [isBookmarked, setBookmark] = useState(restaurant.isBookmarked);
  const [isLiked, setIsLiked] = useState(restaurant.isLiked);

  function toggleBookmark() {
    setBookmark(!isBookmarked);
  }

  function toggleLike() {
    setIsLiked(!isLiked);
  }

  useEffect(
    () =>
      // print updated bookmark
      console.log("Rest Marked:", isBookmarked),
    [isBookmarked]
  );

  return (
    <>
      <OverviewContainer>
        <Line>
          <RestName>{restaurant.name}</RestName>
          <Inline>
            <Status open={isOpen}>
              {isOpen ? "OPEN" : "CLOSE"}
            </Status>
            {isBookmarked ? (
              <BookmarkActive onClick={toggleBookmark} />
            ) : (
              <Bookmark onClick={toggleBookmark} />
            )}
          </Inline>
        </Line>
        <Line>{restaurant.description}</Line>
        <PriceRange>
          ฿{restaurant.minPrice} - ฿{restaurant.maxPrice}
        </PriceRange>
        <Divider />
        <Record>
          {restaurant.ratingCount} ratings ({restaurant.commentCount} reviews)
        </Record>
        <Line>
          <div>
            <AverageRate defaultValue={restaurant.avgRate} disabled allowHalf />
            <AvgRateText>{restaurant.avgRate}</AvgRateText>
          </div>
          {isLiked ? (
            <HeartACtive onClick={toggleLike} />
          ) : (
            <Heart onClick={toggleLike} />
          )}
        </Line>
      </OverviewContainer>
    </>
  );
};

export default Overview;
