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
  const [isLiked, setIsLiked] = useState(props.review.liked);
  const [likeCount, setLikeCount] = useState(props.review.likeCount);

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
          <ProfilePic src={<img src={props.review.profileImg} />} />
          <ReviewHead>
            <Name>{props.review.reviewer}</Name>
            <div>
              <Rating defaultValue={props.review.rate} disabled />
              <Date>{props.review.date}</Date>
            </div>
          </ReviewHead>
        </Line>
        <CommentSection>
          <Comment>{props.review.comment}</Comment>
          <Line>
            {props.review.pictures.map((pic, index) => {
              return <ReviewPic key={index} src={pic} />;
            })}
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
