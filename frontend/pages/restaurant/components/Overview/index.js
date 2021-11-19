import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
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
import UserAPI from "../../../api/userAPI";

const Overview = (props) => {
  const restaurant = props.info;
  const isOpen = props.status;
  const ratingCount = props.ratingAmount;
  const commentCount = props.commentAmount;
  const bookmarked = props.isBookmarked;
  const liked = props.isLiked;
  const [isBookmarked, setBookmark] = useState(bookmarked);
  const [isLiked, setIsLiked] = useState(liked);
  const [avgText, setAvgText] = useState(null);
  const [user_id, setUserID] = useState(null);

  const res_id = "617d07fb8f7c593a9e729a56";

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    setUserID(userData.id);
  }, []);

  useEffect(() => {
    changeBookLike();
  }, [bookmarked, liked]);

  useEffect(() => {
    if (props.avgRate != null) {
      setAvgText(props.avgRate);
    }
  }, [props.avgRate]);

  function toggleBookmark() {
    setBookmark(!isBookmarked);
    manageRestaurantList("myInterestRestaurants", isBookmarked);
  }

  function toggleLike() {
    setIsLiked(!isLiked);
    manageRestaurantList("myFavRestaurants", isLiked);
  }

  const changeBookLike = () => {
    setBookmark(bookmarked);
    setIsLiked(liked);
  };

  const manageRestaurantList = (key, isDeleteFromList) => {
    if (!isDeleteFromList) {
      UserAPI.addRestaurantToList(key, user_id, res_id)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      UserAPI.removeResFromList(key, user_id, res_id)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
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
            <AverageRate
              defaultValue={avgText}
              value={avgText}
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
