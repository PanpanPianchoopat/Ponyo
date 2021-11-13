import React, { useState, useEffect } from "react";
import {
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

const Review = (props) => {
  const [isLiked, setIsLiked] = useState(props.review.likeReview);
  const [likeCount, setLikeCount] = useState(props.review.countLike);
  const review = props.review;

  const handleClick = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    console.log("Review Liked:", isLiked);
  }, [isLiked]);

  return (
    <>
      <ReviewContainer>
        <Line>
          <ProfilePic src={<img src={review ? review.user.image: null} />} />
          <ReviewHead>
            <Name>{review ? review.reviewer : null}</Name>
            <div>
              <Rating defaultValue={review?review.star:null} disabled />
              <Date>{review ? review.date:null}</Date>
            </div>
          </ReviewHead>
        </Line>
        <CommentSection>
          <Comment>{review ? review.reviewText:null}</Comment>
          <Line>
            {review ? review.image.map((pic, index) => {
              return <ReviewPic key={index} src={pic} />;
            }): []}
          </Line>
          <Line>
            {isLiked ? (
              <ActiveLikeButton onClick={handleClick} />
            ) : (
              <LikeButton onClick={handleClick} />
            )}
            <LikeNum>{likeCount}</LikeNum>
          </Line>
        </CommentSection>
      </ReviewContainer>
    </>
  );
};

export default Review;
