import React, { useState, useEffect } from "react";
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
} from "./styled";
import WriteReview from "./components/WriteReview";
import Ratings from "./components/Ratings";
import Carousel from "./components/Carousel";
import Overview from "./components/Overview";
import Detail from "./components/Detail";
import Review from "./components/Review";
import { FILTER, COUNT, REVIEWS } from "./constant";
import { Divider } from "antd";
import RestaurantAPI from "../api/restaurantAPI";

import { REST_INFO } from "./constant";

const Restaurant = () => {
  const [filter, setFilter] = useState(0);
  const [resInfo, setDetail] = useState(null);
  const [statusInfo, setStatus] = useState(null);
  const [isLiked, setLiked] = useState(null);
  const [isBookmarked, setBookmarked] = useState(null);
  const [ratingInfo, setRate] = useState(null);
  const [reviewAmountInfo, setRatingAmount] = useState(null);
  const [commentAmountInfo, setCommentAmount] = useState(null);

  useEffect(() => {
    getRestaurantDetail();
    getRestaurantStatus();
    calReviewRate();
    getReviewAmount();
    getLikedBookmarked();
  }, []);

  useEffect(() => {
    console.log(resInfo);
  }, [resInfo]);

  const StarNum = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<Star />);
    }
    return stars;
  };

  const getRestaurantDetail = () => {
    const res_id = "617aeb9ca6287c38c323f851";
    RestaurantAPI.getRestaurantDetail(res_id)
      .then((response) => {
        setDetail(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getRestaurantStatus = () => {
    const res_id = "617aeb9ca6287c38c323f851";
    RestaurantAPI.getRestaurantStatus(res_id)
      .then((response) => {
        setStatus(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const calReviewRate = () => {
    const res_id = "617aeb9ca6287c38c323f851";
    RestaurantAPI.calReviewRate(res_id)
      .then((response) => {
        setRate(response.data[0].avg);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getReviewAmount = () => {
    const res_id = "617aeb9ca6287c38c323f851";
    const ratingAmount = 1;
    const commentAmount = 2;
    const star = 0;
    RestaurantAPI.getReviewAmount(res_id, ratingAmount, star)
      .then((response) => {
        setRatingAmount(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    RestaurantAPI.getReviewAmount(res_id, commentAmount, star)
      .then((response) => {
        setCommentAmount(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getLikedBookmarked = () => {
    const user_id = "618aa139fb57df6bdf51f733";
    const res_id = "617aeb9ca6287c38c323f851";

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
              avgRate={ratingInfo}
              ratingAmount={reviewAmountInfo}
              commentAmount={commentAmountInfo}
              isLiked={isLiked}
              isBookmarked={isBookmarked}
            />
          </LargeSection>
          <LargeSection>
            <WriteReview />
          </LargeSection>
        </div>
        <div>
          <SmallSection style={{ marginBottom: "15px" }}>
            <Detail detail={resInfo} />
          </SmallSection>
          <SmallSection>
            <Ratings rates={REST_INFO.ratings} />
          </SmallSection>
        </div>
        <FullSection>
          <Overview
            info={resInfo}
            status={statusInfo}
            avgRate={ratingInfo}
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
          <Ratings rates={REST_INFO.ratings} />
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
                  onClick={() => setFilter(index)}
                >
                  {typeof type === "string" ? type : <div>{StarNum(type)}</div>}
                  <Number isSelected={filter == index}>({COUNT[index]})</Number>
                </FilterButton>
              );
            })}
          </ReviewFilters>
          <Divider />
          <ReviewsContainer>
            {REVIEWS.map((review, index) => {
              return <Review key={index} review={review} />;
            })}
          </ReviewsContainer>
        </ReviewInnerContainer>
      </ReviewContainer>
    </>
  );
};

export default Restaurant;
