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
import ReviewAPI from "../../../api/reviewAPI";

const Review = (props) => {
  const [isLiked, setIsLiked] = useState(props.review.likeReview);
  const [likeCount, setLikeCount] = useState(props.review.countLike);
  const [addLikeReview, setAddLikeReview] = useState(null);

  const review = props.review;
  const user_id = "618e861f44657266888550c3";
  const res_id = "617d07fb8f7c593a9e729a56";

  const handleClick = (review_id) => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      likeReview(review_id, false);
    } else {
      setLikeCount(likeCount + 1);
      likeReview(review_id, true);
    }
    setIsLiked(!isLiked);
  };


  const likeReview = (review_id, like) => {
    ReviewAPI.addLikeReview(review_id, user_id, like)
      .then((response) => {
        setAddLikeReview(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <ReviewContainer>
        <Line>
          <ProfilePic src={<img src={review ? review.user.image : null} />} />
          <ReviewHead>
            <Name>{review ? review.reviewer : null}</Name>
            <div>
              <Rating
                defaultValue={review ? review.star : null}
                value={review ? review.star : 0}
                disabled
              />
              <Date>{review ? review.date : null}</Date>
            </div>
          </ReviewHead>
        </Line>
        <CommentSection>
          <Comment>{review ? review.reviewText : null}</Comment>
          <Line>
            {review
              ? review.image.map((pic, index) => {
                  return <ReviewPic key={index} src={pic} />;
                })
              : []}
          </Line>
          <Line>
            {isLiked ? (
              <ActiveLikeButton onClick={() => handleClick(review._id)} />
            ) : (
              <LikeButton onClick={() => handleClick(review._id)} />
            )}
            <LikeNum>{likeCount}</LikeNum>
          </Line>
        </CommentSection>
      </ReviewContainer>
    </>
  );
};

export default Review;
