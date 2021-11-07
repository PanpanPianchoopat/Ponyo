import React, { useState } from "react";
import {
  DetailContainer,
  RevertContainer,
  BigContainer,
  SmallContainer,
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
  StyledRadio,
} from "./styled";
import WriteReview from "./components/WriteReview";
import Ratings from "./components/Ratings";
import Carousel from "./components/Carousel";
import { SAMPLE_IMAGE } from "./components/Carousel/constant";
import Overview from "./components/Overview";
import Detail from "./components/Detail";
import Review from "./components/Review";
import { FILTER, COUNT, REVIEWS } from "./constant";
import { Divider } from "antd";

const Restaurant = () => {
  const [filter, setFilter] = useState(0);

  const StarNum = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<Star />);
    }
    return stars;
  };

  return (
    <>
      <HeadSection>
        <Name>
          Dek Ying Pungjung
          <Underline />
        </Name>
        <Carousel slides={SAMPLE_IMAGE} />
      </HeadSection>
      <DetailContainer>
        <BigContainer>
          <Overview />
        </BigContainer>
        <SmallContainer>
          <Detail />
        </SmallContainer>
      </DetailContainer>
      <RevertContainer>
        <BigContainer>
          <WriteReview />
        </BigContainer>
        <SmallContainer>
          <Ratings />
        </SmallContainer>
      </RevertContainer>
      <ReviewContainer>
        <ReviewInnerContainer>
          <SectionHeader>Review</SectionHeader>
          <SectionUnderline />
          <ReviewFilters>
            {FILTER.map((type, index) => (
              <FilterButton
                key={index}
                isSelected={filter == index}
                onClick={() => setFilter(index)}
              >
                {typeof type === "string" ? type : <div>{StarNum(type)}</div>}
                <Number>({COUNT[index]})</Number>
              </FilterButton>
            ))}
          </ReviewFilters>
          <Divider />
          <ReviewsContainer>
            {REVIEWS.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </ReviewsContainer>
        </ReviewInnerContainer>
      </ReviewContainer>
    </>
  );
};

export default Restaurant;
