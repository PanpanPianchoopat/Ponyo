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
  const ratingCount = props.ratingAmount;
  const commentCount = props.commentAmount;
  const bookmarked = props.isBookmarked;
  const liked = props.isLiked;
  const [isBookmarked, setBookmark] = useState(bookmarked);
  const [isLiked, setIsLiked] = useState(liked);
  const [rate, setRate] = useState(null);
  const [avgText, setAvgText] = useState(null);

  useEffect(() => {
    changeBookLike();
  }, [bookmarked, liked]);

  useEffect(() => {
    const newRate = (
      <AverageRate defaultValue={props.avgRate} allowHalf disabled />
    );
    if (props.avgRate != null) {
      console.log("BEFORE_ENTER");
      setRate(newRate);
      console.log("AFTER_CALL");
      setAvgText(props.avgRate);
    }
  }, [props.avgRate]);

  // useEffect(() => {
  //   if (avgText != null) {
  //     console.log("12345");
  //     setAvgRate(<AverageRate defaultValue={avgText} allowHalf disabled />);
  //     console.log("after set avg");
  //   }
  // }, [avgText]);

  useEffect(() => {
    console.log("CHANGE_STAR");
  }, [rate]);

  useEffect(() => {
    console.log("Rest Marked:", isBookmarked);
  }, [isBookmarked]);

  function toggleBookmark() {
    setBookmark(!isBookmarked);
  }

  function toggleLike() {
    setIsLiked(!isLiked);
  }

  const changeBookLike = () => {
    setBookmark(bookmarked);
    setIsLiked(liked);
  };

  return (
    <>
      <OverviewContainer>
        <Line>
          <RestName>{restaurant ? restaurant.details.name : ""}</RestName>
          <Inline>
            <Status open={isOpen}>{isOpen ? "OPEN" : "CLOSE"}</Status>
            {isBookmarked ? (
              <BookmarkActive onClick={toggleBookmark} />
            ) : (
              <Bookmark onClick={toggleBookmark} />
            )}
          </Inline>
        </Line>
        <Line>{restaurant ? restaurant.details.description : ""}</Line>
        <PriceRange>
          ฿{restaurant ? restaurant.details.priceRange.min : "0"} - ฿
          {restaurant ? restaurant.details.priceRange.max : "0"}
        </PriceRange>
        <Divider />
        <Record>
          {ratingCount} ratings ({commentCount} reviews)
        </Record>
        <Line>
          <div>
            {/* {rate} */}

            <AverageRate
              defaultValue={avgText}
              allowHalf
              disabled
            />
            <AvgRateText>{avgText}</AvgRateText>
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
