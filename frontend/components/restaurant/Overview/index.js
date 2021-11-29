import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { Divider } from "antd";
import UserAPI from "../../../pages/api/userAPI";
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
  const [avgRate, setAvgRate] = useState(null);
  const [user_id, setUserID] = useState(null);

  useEffect(() => {
    if (props.info) {
      setResID(props.info.details._id);
    }
  }, [props.info]);

  useEffect(() => {
    if (props.avgRate != null) {
      setAvgRate(props.avgRate);
    }
  }, [props.avgRate]);

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

  function toggleBookmark() {
    if (resID) {
      manageRestaurantList("myInterestRestaurants", isBookmarked);
    }
  }

  function toggleLike() {
    if (resID) {
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
              message.success("Add restaurant to favorite list successfully");
            } else {
              message.warning(
                "Your favorite list is full, Try to delete some restaurant"
              );
            }
          } else {
            if (response.data.status) {
              setBookmark(!isBookmarked);
              message.success("Add restaurant to interest list successfully");
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
          if (key == "myFavRestaurants") {
            if (response.data.status) {
              setIsLiked(!isLiked);
              message.success(
                "Remove restaurant to favorite list successfully"
              );
            } else {
              message.success("Error to remove restaurant from favorite list");
            }
          } else {
            if (response.data.status) {
              setBookmark(!isBookmarked);
              message.success(
                "Remove restaurant from interest list successfully"
              );
            } else {
              message.success("Error to remove restaurant from interest list");
            }
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
        <Line>{restaurant ? `(${restaurant.details.type})` : ""}</Line>
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
              defaultValue={avgRate}
              value={avgRate}
              allowHalf
              disabled
            />
            <AvgRateText>{avgRate}</AvgRateText>
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
