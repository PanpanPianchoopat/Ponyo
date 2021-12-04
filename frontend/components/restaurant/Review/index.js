/*******************************************************************************
 * Review component - a restaurant review
 * 'review' is detail of a review for the restaurant.
 ******************************************************************************/

import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import ReviewAPI from "../../../pages/api/reviewAPI";
import { Divider, Modal, Popconfirm } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import EditReview from "./components/EditReview";
import {
  ReviewContainer,
  ProfilePic,
  DefaultProfileImage,
  ReviewHead,
  HeadLine,
  ButtonGroup,
  EditButton,
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
import router from "next/router";

const Review = (props) => {
  const review = props.review;
  const [reviewRate, setReviewRate] = useState(0); // rating of that review
  const [reviewText, setReviewText] = useState(null); // comment of that review
  const [reviewImage, setReviewImage] = useState(null); // review photos
  const [isLiked, setIsLiked] = useState(false); // has user liked that review
  const [likeCount, setLikeCount] = useState(null); // number of review like
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSave, setIsSave] = useState(false); // save changes or not

  const [userID, setUserID] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setUserID(userData.id);
    }
    if (props.review) {
      setReviewRate(props.review.star);
      setReviewText(props.review.reviewText);
      setReviewImage(props.review.image);
      setIsLiked(props.review.likeReview);
      setLikeCount(props.review.countLike);
    }
  }, []);

  useEffect(() => {
    setReviewRate(props.review.star);
    setReviewText(props.review.reviewText);
    setReviewImage(props.review.image);
    setIsLiked(props.review.likeReview);
    setLikeCount(props.review.countLike);
  }, [props.review, userID]);

  /* If the user want to save changes after edit review, call edit function */
  useEffect(() => {
    if (isSave) {
      editReview();
    }
  }, [isSave]);

  /* This function handle heart button click event.
   * It set number of like, call function to update info in database, and
   * toggle heart button.
   * 'reviewID' is ID of the review.
   */
  const handleClick = (reviewID) => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      likeReview(reviewID, false);
    } else {
      setLikeCount(likeCount + 1);
      likeReview(reviewID, true);
    }
    setIsLiked(!isLiked);
  };

  /* This function update information of review's like in database.
   * 'reviewID' is ID of the review.
   * 'like'     is boolean to specify the action. Set to true is add like. And,
   *            false is unlike.
   * It logs like status in boolean and feedback message if success.
   * Otherwise, it logs error.
   */
  const likeReview = (reviewID, like) => {
    ReviewAPI.addLikeReview(reviewID, userID, like)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /* This function edit review information in the database.
   * It set saving changes back to false after finish updating.
   */
  const editReview = () => {
    const data = {
      star: reviewRate,
      reviewText: reviewText,
      image: reviewImage,
    };
    ReviewAPI.editReview(props.review._id, data)
      .then((response) => {
        console.log(response.data);
        setIsSave(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /* This function deletes review and reduces total number of the restaurant's
   * review by 1 from the database. It reloads the page if delete success.
   */
  function handleDelete() {
    ReviewAPI.deleteReview(props.review._id)
      .then((response) => {
        if (response.data.status) {
          router.reload();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <ReviewContainer>
        <Line>
          {review && review.user.image ? (
            <ProfilePic src={<img src={review.user.image} />} />
          ) : (
            <ProfilePic icon={<DefaultProfileImage />} />
          )}
          <ReviewHead>
            <HeadLine>
              <Name>{review && review.reviewer}</Name>
              {review && review.editDelete && (
                <ButtonGroup>
                  <EditButton onClick={() => setPopupVisible(true)}>
                    <BsPencil />
                  </EditButton>
                  <Divider type="vertical" style={{ height: "25px" }} />
                  <Popconfirm
                    title="Are you sure to delete your review?"
                    placement="topRight"
                    onConfirm={handleDelete}
                  >
                    <EditButton>
                      <BsTrash />
                    </EditButton>
                  </Popconfirm>
                </ButtonGroup>
              )}
            </HeadLine>
            <div>
              <Rating defaultValue={reviewRate} value={reviewRate} disabled />
              <Date>{review && review.date}</Date>
            </div>
          </ReviewHead>
        </Line>
        <CommentSection>
          <Comment>{reviewText}</Comment>
          <Line>
            {reviewImage &&
              reviewImage.map((pic, index) => {
                return <ReviewPic key={index} src={pic} />;
              })}
          </Line>
          {userID && (
            <Line>
              {isLiked ? (
                <ActiveLikeButton onClick={() => handleClick(review._id)} />
              ) : (
                <LikeButton onClick={() => handleClick(review._id)} />
              )}
              <LikeNum>{likeCount}</LikeNum>
            </Line>
          )}
        </CommentSection>
      </ReviewContainer>

      <Modal
        visible={popupVisible}
        footer={null}
        destroyOnClose={true}
        onCancel={() => setPopupVisible(false)}
      >
        <EditReview
          review={{
            rate: reviewRate,
            text: reviewText,
            photos: reviewImage,
          }}
          setVisible={setPopupVisible}
          setRate={setReviewRate}
          setText={setReviewText}
          setSave={setIsSave}
          setPhotos={setReviewImage}
        />
      </Modal>
    </>
  );
};

export default Review;
