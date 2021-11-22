import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import {
  ReviewContainer,
  ProfilePic,
  DefaultProfileImage,
  ReviewHead,
  HeadLine,
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
import ReviewAPI from "../../../api/reviewAPI";
import { Divider, Modal, Popconfirm } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import EditReview from "./components/EditReview";

const Review = (props) => {
  const [isLiked, setIsLiked] = useState(props.review.likeReview);
  const [likeCount, setLikeCount] = useState(props.review.countLike);
  const [addLikeReview, setAddLikeReview] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const review = props.review;
  const isEdit = props.review.editDelete;
  const [reviewRate, setReviewRate] = useState(review ? review.star : 0);
  const [reviewText, setReviewText] = useState(
    review ? review.reviewText : null
  );
  const [isSave, setSaveReview] = useState(false);
  const [reviewImage, setReviewImage] = useState(review ? review.image : null);
  const [user_id, setUserID] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setUserID(userData.id);
    }
  }, []);

  useEffect(() => {
    if (isSave) {
      editReview();
    }
  }, [isSave]);

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
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editReview = () => {
    const data = {
      star: reviewRate,
      reviewText: reviewText,
      image: reviewImage,
    };
    ReviewAPI.editReview(props.review._id, data)
      .then((response) => {
        console.log(response.data);
        setSaveReview(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [showReview, setShowReview] = useState(true);

  function handleDelete() {
    // remove review from database and reduce total number of review by 1

    ReviewAPI.deleteReview(props.review._id)
      .then((response) => {
        console.log(response.data);
        setShowReview(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <ReviewContainer visible={showReview}>
        <Line>
          {review && review.user.image ? (
            <ProfilePic src={<img src={review.user.image} />} />
          ) : (
            <ProfilePic icon={<DefaultProfileImage />} />
          )}
          <ReviewHead>
            <HeadLine>
              <Name>{review ? review.reviewer : null}</Name>
              {isEdit ? (
                <div style={{ display: "flex", alignItems: "center" }}>
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
                </div>
              ) : (
                ""
              )}
            </HeadLine>
            <div>
              <Rating defaultValue={reviewRate} value={reviewRate} disabled />
              <Date>{review ? review.date : null}</Date>
            </div>
          </ReviewHead>
        </Line>
        <CommentSection>
          <Comment>{reviewText}</Comment>
          <Line>
            {reviewImage
              ? reviewImage.map((pic, index) => {
                  return <ReviewPic key={index} src={pic} />;
                })
              : []}
          </Line>
          {user_id ? (
            <Line>
              {isLiked ? (
                <ActiveLikeButton onClick={() => handleClick(review._id)} />
              ) : (
                <LikeButton onClick={() => handleClick(review._id)} />
              )}
              <LikeNum>{likeCount}</LikeNum>
            </Line>
          ) : null}
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
          setSave={setSaveReview}
          setPhotos={setReviewImage}
        />
      </Modal>
    </>
  );
};

export default Review;
