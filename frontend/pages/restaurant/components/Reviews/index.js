import React, { useState } from "react";
import {
  SectionContainer,
  SectionHeader,
  Underline,
  ReviewFilters,
  FilterButton,
  Number,
  Star,
  ReviewContainer,
  ProfilePic,
  ReviewHead,
  LikeButton,
  ActiveLikeButton,
  Line,
  Name,
  Rating,
  Date,
  CommentSection,
  Comment,
  ReviewPic,
  LikeNum,
} from "./styled";
import { FILTER, COUNT, REVIEWS } from "./constant";
import { Divider } from "antd";

const Reviews = () => {
  const [filter, setFilter] = useState(0);

  const StarNum = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<Star />);
    }
    return stars;
  };

  return (
    <SectionContainer>
      <SectionHeader>Reviews</SectionHeader>
      <Underline />
      <Line>
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
      </Line>
      <Divider />
      {REVIEWS.map((review, index) => (
        <ReviewContainer key={index}>
          <Line>
            <ProfilePic src={<img src={review.avatar} />} />
            <ReviewHead>
              <Name>{review.reviewer}</Name>
              <div>
                <Rating defaultValue={review.rate} disabled />
                <Date>{review.date}</Date>
              </div>
            </ReviewHead>
          </Line>
          <CommentSection>
            <Comment>{review.comment}</Comment>
            <Line>
              {review.pictures.map((pic, index) => (
                <ReviewPic src={pic} key={index} />
              ))}
            </Line>
            <Line>
              {review.liked ? <ActiveLikeButton /> : <LikeButton />}
              <LikeNum>{review.likes}</LikeNum>
            </Line>
          </CommentSection>
        </ReviewContainer>
      ))}
    </SectionContainer>
  );
};

export default Reviews;
