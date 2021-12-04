/*******************************************************************************
 * Overview component - restaurant's overview.
 * 'info'         is restaurant's information.
 * 'status'       is restaurant's service status. It is true if the restaurant
 *                is openning. And, false if the restaurant is closed.
 * 'avgRate'      is average rating of the restaurant.
 * 'ratingAmount' is number/count of rate of the restaurant.
 * 'commentAmount'is number/count of reviews with text message.
 * 'isLiked'      is whether the user saved the restaurant to his/her favourite
 *                list or not.
 * 'isBookmarked' is whether the user saved the restaurant to his/her interest
 *                list or not.
 ******************************************************************************/

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
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setUserID(userData.id);
    }
  }, []);

  useEffect(() => {
    if (props.info) {
      setResID(props.info.details._id);
    }
  }, [props.info]);

  useEffect(() => {
    if (props.avgRate) {
      setAvgRate(props.avgRate);
    }
  }, [props.avgRate]);

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

  /* This function add/remove the restaurant to user's favourite/interest list.
   * 'key'                is list type to handle with.
   * 'isDeletedFromList'  is whether the user want to add or delete from list.
   *                      If false, add restaurant to the corresponding list.
   *                      Otherwise, remove the restaurant from the list.
   */
  const manageRestaurantList = (key, isDeleteFromList) => {
    if (!isDeleteFromList) {
      UserAPI.addRestaurantToList(key, userID, resID)
        .then((response) => {
          if (key === "myFavRestaurants") {
            if (response.data.status) {
              setIsLiked(true);
              message.success("Successfully add restaurant to favourite list");
            } else {
              message.warning(
                "Your favourite list is full, Try to delete some restaurant"
              );
            }
          } else {
            if (response.data.status) {
              setBookmark(true);
              message.success("Successfully add restaurant to interest list");
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
      UserAPI.removeResFromList(key, userID, resID)
        .then((response) => {
          if (key == "myFavRestaurants") {
            if (response.data.status) {
              setIsLiked(false);
              message.success(
                "Successfully remove restaurant to favourite list"
              );
            } else {
              message.success("Error to remove restaurant from favourite list");
            }
          } else {
            if (response.data.status) {
              setBookmark(false);
              message.success(
                "Successfully remove restaurant from interest list"
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
            {userID ? (
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
          {userID ? (
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
