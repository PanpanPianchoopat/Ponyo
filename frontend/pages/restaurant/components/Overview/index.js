import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { Divider } from "antd";
import UserAPI from "../../../api/userAPI";
import { message } from "antd";
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

const Overview = (props) => {
  const restaurant = props.info;
  const isOpen = props.status;
  const ratingCount = props.ratingAmount;
  const commentCount = props.commentAmount;
  const bookmarked = props.isBookmarked;
  const liked = props.isLiked;
  const [resID, setResID] = useState(null);
  const [isBookmarked, setBookmark] = useState(bookmarked);
  const [isLiked, setIsLiked] = useState(liked);
  const [avgText, setAvgText] = useState(null);
  const [user_id, setUserID] = useState(null);

  useEffect(() => {
    if (props.info) {
      setResID(props.info.details._id);
    }
  }, [props.info]);

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setUserID(userData.id);
    }
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
    if (user_id) {
      manageRestaurantList("myInterestRestaurants", isBookmarked);
    }
  }

  function toggleLike() {
    if (user_id) {
      manageRestaurantList("myFavRestaurants", isLiked);
    }
  }

  const changeBookLike = () => {
    setBookmark(bookmarked);
    setIsLiked(liked);
  };

  const manageRestaurantList = (key, isDeleteFromList) => {
    if (!isDeleteFromList) {
      UserAPI.addRestaurantToList(key, user_id, resID)
        .then((response) => {
          if (key == "myFavRestaurants") {
            if (response.data.status) {
              setIsLiked(!isLiked);
            } else {
              message.warning(
                "Your favorite list is full, Try to delete some restaurant"
              );
            }
          } else {
            if (response.data.status) {
              setBookmark(!isBookmarked);
            } else {
              message.warning(
                "Your interest list is full, Try to delete some restaurant"
              );
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      UserAPI.removeResFromList(key, user_id, resID)
        .then((response) => {
          if (response.data.status) {
            setIsLiked(!isLiked);
          }
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
            {user_id ? (
              isBookmarked ? (
                <BookmarkActive onClick={toggleBookmark} />
              ) : (
                <Bookmark onClick={toggleBookmark} />
              )
            ) : null}
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
          {user_id ? (
            isLiked ? (
              <HeartACtive onClick={toggleLike} />
            ) : (
              <Heart onClick={toggleLike} />
            )
          ) : null}
        </Line>
      </OverviewContainer>
    </>
  );
};

export default Overview;
