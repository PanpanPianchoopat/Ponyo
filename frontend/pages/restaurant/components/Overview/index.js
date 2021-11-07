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
import { DATA } from "./constant";
import { Divider } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const Overview = () => {
  const [isBookmarked, setBookmark] = useState(DATA.bookmark);
  const [isLiked, setIsLiked] = useState(DATA.like);

  function toggleBookmark() {
    setBookmark(!isBookmarked);
  }

  function toggleLike() {
    setIsLiked(!isLiked);
  }

  useEffect(
    () =>
      // print updated bookmark
      console.log(isBookmarked),
    [isBookmarked]
  );

  return (
    <OverviewContainer>
      <Line>
        <RestName>{DATA.name}</RestName>
        <Inline>
          <Status background={DATA.status}>{DATA.status.toUpperCase()}</Status>
          {isBookmarked ? (
            <BookmarkActive onClick={toggleBookmark} />
          ) : (
            <Bookmark onClick={toggleBookmark} />
          )}
        </Inline>
      </Line>
      <Line>{DATA.description}</Line>
      <PriceRange>
        ฿{DATA.minPrice} - ฿{DATA.maxPrice}
      </PriceRange>
      <Divider />
      <Record>
        {DATA.rateNum} ratings ({DATA.reviewNum} reviews)
      </Record>
      <Line>
        <div>
          <AverageRate defaultValue={DATA.avgRate} disabled allowHalf />
          <AvgRateText>{DATA.avgRate}</AvgRateText>
        </div>
        {isLiked ? (
          <HeartACtive onClick={toggleLike} />
        ) : (
          <Heart onClick={toggleLike} />
        )}
      </Line>
    </OverviewContainer>
  );
};

export default Overview;
