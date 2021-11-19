import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import useAppSelector from "../../hooks/useAppSelector";
import {
  DetailContainer,
  LargeSection,
  SmallSection,
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
  FullSection,
  EmptyDisplayContainer,
} from "./styled";
import WriteReview from "./components/WriteReview";
import Ratings from "./components/Ratings";
import Carousel from "./components/Carousel";
import Overview from "./components/Overview";
import Detail from "./components/Detail";
import Review from "./components/Review";
import { FILTER, KEY_FILTER, REVIEW_FILTER } from "./constant";
import { Divider } from "antd";
import RestaurantAPI from "../api/restaurantAPI";
import ReviewAPI from "../api/reviewAPI";
import Image from "next/image";

const Restaurant = () => {
  // const { token, data } = useAppSelector((state) => state.auth);
  const [user_id, setUserID] = useState(null);
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

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    setUserID(userData.id);
  }, []);


  useEffect(() => {
    getRestaurantDetail();
    getRestaurantStatus();
    getAvgRate();
    getReviewAmount();
    getStarAmount();
    getReviewByFilter(0);
    if (user_id != null) {
      getLikedBookmarked();
    }
  }, []);

  const updateInfo = (review) => {
    if (review) {
      getAvgRate();
      getReviewAmount();
    }
  };

  // const user_id = "618d4337965a69dd7993e643";
  const res_id = "617d07fb8f7c593a9e729a56";

  const StarNum = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<Star />);
    }
    return stars;
  };

  const getRestaurantDetail = () => {
    RestaurantAPI.getRestaurantDetail(res_id)
      .then((response) => {
        setDetail(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getRestaurantStatus = () => {
    RestaurantAPI.getRestaurantStatus(res_id)
      .then((response) => {
        setStatus(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAvgRate = () => {
    ReviewAPI.calReviewRate(res_id)
      .then((response) => {
        setAvgRate(response.data[0].avgStar);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getReviewAmount = () => {
    const star = 0;
    ReviewAPI.getReviewAmount(res_id, "all", star)
      .then((response) => {
        setRatingAmount(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    ReviewAPI.getReviewAmount(res_id, "comment", star)
      .then((response) => {
        setCommentAmount(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    ReviewAPI.getReviewAmount(res_id, "photo", star)
      .then((response) => {
        setPhotoAmount(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getStarAmount = () => {
    const allRating = [];
    for (let star = 5; star >= 1; star--) {
      ReviewAPI.getStarAmount(res_id, "star", star)
        .then((response) => {
          allRating.push(response.data);
          setStarAmount(allRating);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const getLikedBookmarked = () => {
    RestaurantAPI.getLikedBookmarked("myFavRestaurants", user_id, res_id)
      .then((response) => {
        setLiked(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    RestaurantAPI.getLikedBookmarked("myInterestRestaurants", user_id, res_id)
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
    if (index == 0) {
      ReviewAPI.getAllReview(res_id, user_id)
        .then((response) => {
          setReview(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (index >= 3) {
      const starFilter = FILTER[index];
      ReviewAPI.getReviewByFilter(type[3], res_id, user_id, starFilter)
        .then((response) => {
          setReview(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      const starFilter = 0;
      ReviewAPI.getReviewByFilter(type[index], res_id, user_id, starFilter)
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
        break;
      case REVIEW_FILTER.PHOTO:
        return photoAmountInfo ? photoAmountInfo : 0;
        break;
      case REVIEW_FILTER.FIVE_STAR:
        return starInfo ? starInfo[REVIEW_FILTER.FIVE_STAR_INFO] : 0;
        break;
      case REVIEW_FILTER.FOUR_STAR:
        return starInfo ? starInfo[REVIEW_FILTER.FOUR_STAR_INFO] : 0;
        break;
      case REVIEW_FILTER.THREE_STAR:
        return starInfo ? starInfo[REVIEW_FILTER.THREE_STAR_INFO] : 0;
        break;
      case REVIEW_FILTER.TWO_STAR:
        return starInfo ? starInfo[REVIEW_FILTER.TWO_STAR_INFO] : 0;
        break;
      case REVIEW_FILTER.ONE_STAR:
        return starInfo ? starInfo[REVIEW_FILTER.ONE_STAR_INFO] : 0;
        break;
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

      <DetailContainer>
        <div>
          <LargeSection style={{ marginBottom: "15px" }}>
            <Overview
              info={resInfo}
              status={statusInfo}
              avgRate={avgRate}
              ratingAmount={reviewAmountInfo}
              commentAmount={commentAmountInfo}
              isLiked={isLiked}
              isBookmarked={isBookmarked}
            />
          </LargeSection>
          <LargeSection>
            <WriteReview func={updateInfo} />
          </LargeSection>
        </div>
        <div>
          <SmallSection style={{ marginBottom: "15px" }}>
            <Detail detail={resInfo} />
          </SmallSection>
          <SmallSection>
            <Ratings rates={starInfo} />
          </SmallSection>
        </div>
        <FullSection>
          <Overview
            info={resInfo}
            status={statusInfo}
            avgRate={avgRate}
            ratingAmount={reviewAmountInfo}
            commentAmount={commentAmountInfo}
            isLiked={isLiked}
            isBookmarked={isBookmarked}
          />
        </FullSection>
        <FullSection>
          <Detail detail={resInfo} />
        </FullSection>
        <FullSection>
          <Ratings rates={starInfo} />
        </FullSection>
        <FullSection>
          <WriteReview />
        </FullSection>
      </DetailContainer>

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
                  <Image src="/assets/redBowl.svg" width={200} height={150} />
                  <p>No review yet</p>
                </EmptyDisplayContainer>
              )
            ) : null}
          </ReviewsContainer>
        </ReviewInnerContainer>
      </ReviewContainer>
    </>
  );
};

export default Restaurant;
