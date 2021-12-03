import React, { useState, useEffect } from "react";
import { BASE_URL } from "../api/http-common";
import jwt from "jsonwebtoken";
import WriteReview from "../../components/restaurant/WriteReview";
import Ratings from "../../components/restaurant/Ratings";
import Carousel from "../../components/restaurant/Carousel";
import Overview from "../../components/restaurant/Overview";
import Detail from "../../components/restaurant/Detail";
import Review from "../../components/restaurant/Review";
import { Divider } from "antd";
import RestaurantAPI from "../api/restaurantAPI";
import ReviewAPI from "../api/reviewAPI";
import Lock from "../../components/Lock";
import { REVIEW } from "../../components/Lock/constant";
import { FILTER, REVIEW_FILTER } from "../../public/constant/restaurant";
import { DUMMY_USER_ID } from "../../public/constant/account";
import {
  Name,
  Underline,
  HeadSection,
  ReviewContainer,
  SectionHeader,
  ReviewInnerContainer,
  SectionUnderline,
  ReviewFilters,
  FilterButton,
  Star,
  Number,
  ReviewsContainer,
  EmptyDisplayContainer,
  EmptyIcon,
  DetailWrapper,
  OverviewWrapper,
  WriteReviewWrapper,
  RestDetailWrapper,
  RatingsWrapper,
} from "./styled";

function Restaurant({ resID }) {
  const [userID, setUserID] = useState(DUMMY_USER_ID);
  const [filter, setFilter] = useState(0);
  const [resInfo, setDetail] = useState(null);
  const [statusInfo, setStatus] = useState(null);
  const [isLiked, setLiked] = useState(null);
  const [isBookmarked, setBookmarked] = useState(null);
  const [avgRate, setAvgRate] = useState(null);
  const [starInfo, setStarAmount] = useState(null);
  const [reviewAmountInfo, setRatingAmount] = useState(null);
  const [commentAmountInfo, setCommentAmount] = useState(null);
  const [photoAmountInfo, setPhotoAmount] = useState(null);
  const [reviewInfo, setReview] = useState(null);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setUserID(userData.id);
      setIsUser(true);
    }
  }, []);

  useEffect(() => {
    getRestaurantDetail();
    getRestaurantStatus();
    getAvgRate();
    getReviewAmount();
    getStarAmount();
    getReviewByFilter(0);
    getLikedBookmarked();
  }, [userID]);

  const updateInfo = (review) => {
    if (review) {
      getAvgRate();
      getReviewAmount();
    }
  };

  const StarNum = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<Star />);
    }
    return stars;
  };

  const getRestaurantDetail = () => {
    RestaurantAPI.getRestaurantDetail(resID)
      .then((response) => {
        setDetail(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getRestaurantStatus = () => {
    RestaurantAPI.getRestaurantStatus(resID)
      .then((response) => {
        setStatus(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAvgRate = () => {
    ReviewAPI.calReviewRate(resID)
      .then((response) => {
        if (response.data[0]) {
          setAvgRate(response.data[0].avgStar);
        } else {
          setAvgRate("");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getReviewAmount = () => {
    const star = 0;
    ReviewAPI.getReviewAmount(resID, "all", star)
      .then((response) => {
        setRatingAmount(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    ReviewAPI.getReviewAmount(resID, "comment", star)
      .then((response) => {
        setCommentAmount(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    ReviewAPI.getReviewAmount(resID, "photo", star)
      .then((response) => {
        setPhotoAmount(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getStarAmount = async () => {
    const allRating = [];
    var star = 5;

    while (star >= 1) {
      await ReviewAPI.getStarAmount(resID, "star", star)
        .then((response) => {
          allRating.push(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      star--;
    }
    setStarAmount(allRating);
  };

  const getLikedBookmarked = () => {
    RestaurantAPI.getLikedBookmarked("myFavRestaurants", userID, resID)
      .then((response) => {
        setLiked(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    RestaurantAPI.getLikedBookmarked("myInterestRestaurants", userID, resID)
      .then((response) => {
        setBookmarked(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getReviewByFilter = (index) => {
    const type = ["all", "comment", "photo", "star"];
    setFilter(index);
    setReview(null);
    if (index == 0) {
      ReviewAPI.getAllReview(resID, userID)
        .then((response) => {
          setReview(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (index >= 3) {
      const starFilter = FILTER[index];
      ReviewAPI.getReviewByFilter(type[3], resID, userID, starFilter)
        .then((response) => {
          setReview(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      const starFilter = 0;
      ReviewAPI.getReviewByFilter(type[index], resID, userID, starFilter)
        .then((response) => {
          setReview(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const getCountReview = (filter) => {
    switch (filter) {
      case REVIEW_FILTER.COMMENT:
        return commentAmountInfo ? commentAmountInfo : 0;

      case REVIEW_FILTER.PHOTO:
        return photoAmountInfo ? photoAmountInfo : 0;

      case REVIEW_FILTER.FIVE_STAR:
        return starInfo ? starInfo[REVIEW_FILTER.FIVE_STAR_INFO] : 0;

      case REVIEW_FILTER.FOUR_STAR:
        return starInfo ? starInfo[REVIEW_FILTER.FOUR_STAR_INFO] : 0;

      case REVIEW_FILTER.THREE_STAR:
        return starInfo ? starInfo[REVIEW_FILTER.THREE_STAR_INFO] : 0;

      case REVIEW_FILTER.TWO_STAR:
        return starInfo ? starInfo[REVIEW_FILTER.TWO_STAR_INFO] : 0;
      case REVIEW_FILTER.ONE_STAR:
        return starInfo ? starInfo[REVIEW_FILTER.ONE_STAR_INFO] : 0;

      default:
        return reviewAmountInfo ? reviewAmountInfo : 0;
    }
  };

  return (
    <>
      <HeadSection>
        <Name>
          {resInfo ? resInfo.details.name : ""}
          <Underline />
        </Name>
        <Carousel slides={resInfo ? resInfo.details.image : []} />
      </HeadSection>

      <DetailWrapper>
        <OverviewWrapper>
          <Overview
            info={resInfo}
            status={statusInfo}
            avgRate={avgRate}
            ratingAmount={reviewAmountInfo}
            commentAmount={commentAmountInfo}
            isLiked={isLiked}
            isBookmarked={isBookmarked}
          />
        </OverviewWrapper>
        <RestDetailWrapper>
          <Detail detail={resInfo} />
        </RestDetailWrapper>
        <WriteReviewWrapper>
          {isUser ? (
            <WriteReview func={updateInfo} resID={resID} />
          ) : (
            <Lock type={REVIEW} />
          )}
        </WriteReviewWrapper>
        <RatingsWrapper>
          <Ratings rates={starInfo} />
        </RatingsWrapper>
      </DetailWrapper>

      <ReviewContainer>
        <ReviewInnerContainer>
          <SectionHeader>Review</SectionHeader>
          <SectionUnderline />
          <ReviewFilters>
            {FILTER.map((type, index) => {
              return (
                <FilterButton
                  key={index}
                  isSelected={filter == index}
                  onClick={() => getReviewByFilter(index)}
                >
                  {typeof type === "string" ? type : <div>{StarNum(type)}</div>}
                  <Number isSelected={filter == index}>
                    ({getCountReview(index)})
                  </Number>
                </FilterButton>
              );
            })}
          </ReviewFilters>
          <Divider />
          <ReviewsContainer>
            {reviewInfo ? (
              reviewInfo.length > 0 ? (
                reviewInfo.map((review, index) => {
                  return <Review key={index} review={review} />;
                })
              ) : (
                <EmptyDisplayContainer>
                  <EmptyIcon src="/assets/redBowl.svg" />
                  <p>No review yet</p>
                </EmptyDisplayContainer>
              )
            ) : null}
          </ReviewsContainer>
        </ReviewInnerContainer>
      </ReviewContainer>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${BASE_URL}/restaurant/detail/${context.params.id}`);
  const restaurant = await res.json();
  const resID = restaurant.details._id;
  return { props: { resID } };
}

export default Restaurant;
