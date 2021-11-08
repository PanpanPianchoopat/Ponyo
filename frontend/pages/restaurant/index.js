import React, { useState } from "react";
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
import { REST_INFO } from "./constant";

function Restaurant() {
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
          {REST_INFO.name}
          <Underline />
        </Name>
        <Carousel slides={REST_INFO.photos} />
      </HeadSection>

      <DetailContainer>
        <div>
          <LargeSection style={{ marginBottom: "15px" }}>
            <Overview info={REST_INFO} />
          </LargeSection>
          <LargeSection>
            <WriteReview />
          </LargeSection>
        </div>
        <div>
          <SmallSection style={{ marginBottom: "15px" }}>
            <Detail detail={REST_INFO} />
          </SmallSection>
          <SmallSection>
            <Ratings rates={REST_INFO.ratings} />
          </SmallSection>
        </div>
        <FullSection>
          <Overview info={REST_INFO} />
        </FullSection>
        <FullSection>
          <Detail detail={REST_INFO} />
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
}

export default Restaurant;
