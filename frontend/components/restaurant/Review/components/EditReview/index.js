/*******************************************************************************
 * EditReview component - popup form for editting review.
 * 'review'     is an object of review rate, review message, and review photos.
 * 'setVisible' is a function passed from parent to set popup visibility.
 * 'setRate'    is a function passed from parent to update rating of the review.
 * 'setText'    is a function passed from parent to update message of the review
 * 'setPhotos'  is a function passed from parent to update photos of the review.
 * 'setSave'    is a function passed from parent to trigger saving changes when
 *              set to true.
 ******************************************************************************/

import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import { Rating } from "../../styled";
import { EditContainer, ButtonGroup, StyledButton } from "./styled";
import {
  StyledInput,
  UploadImage,
  CameraIcon,
  PlusIcon,
} from "../../../WriteReview/styled";
import router from "next/router";
import { REVIEW_PHOTO_LIMIT } from "../../../constant";

const EditReview = (props) => {
  const [newReview] = Form.useForm(); // values filled in the form
  const [reviewPics, setReviewPics] = useState([]); // array of review images

  /* Initialize photo array to display in the form */
  useEffect(() => {
    for (let i = 0; i < props.review.photos.length; i++) {
      reviewPics.push({
        uid: -i,
        name: `pic${i}`,
        status: "done",
        url: props.review.photos[i],
      });
    }
  }, []);

  /* This function converts photo to base64 and adds it to the photo array.
   * 'info' is the uploaded file information.
   */
  function getBase64(info) {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      reviewPics.push({
        uid: info.file.uid,
        name: info.file.name,
        status: "done",
        url: reader.result, // base64 of the file
      })
    );
    reader.readAsDataURL(info.file.originFileObj);
  }

  /* This function handle changes made by the Upload component.
   * 'info' is the uploaded file information.
   */
  const handleChange = (info) => {
    const status = info.file.status; // uploading status
    const fileType = info.file.type; // uploaded file type
    const isValidFile = fileType === "image/jpeg" || fileType === "image/png";

    if (status === "done") {
      /* If upload is completed and the file is .jpeg or .png, get base64 and
       * add it to the photo array */
      if (isValidFile) {
        getBase64(info);
      } else {
        message.error("Invalid file type, review image must be jpeg or png");
      }
    } else if (status === "removed") {
      /* If file is removed, remove the corresponding image from the  array */
      setReviewPics(reviewPics.filter((item) => item.uid !== info.file.uid));
    }
  };

  /* This function handle save button click event by calling functions passed
   * from the parent to edit the information and trigger changes in database.
   * Then, it triggers page reload.
   * 'value'  is values in the form.
   */
  const handleSave = (value) => {
    props.setRate(value.rate);
    props.setText(value.review);
    props.setVisible(false);
    const newPicList = [];
    for (let i = 0; i < reviewPics.length; i++) {
      newPicList.push(reviewPics[i].url);
    }
    props.setPhotos(newPicList);
    props.setSave(true);
  };

  return (
    <EditContainer>
      <Form
        form={newReview}
        onFinish={handleSave}
        initialValues={{
          rate: props.review.rate,
          review: props.review.text,
          uploadPhoto: props.review.photos,
        }}
      >
        <Form.Item name="rate">
          <Rating value={props.review.rate} style={{ fontSize: "30px" }} />
        </Form.Item>

        <Form.Item name="pictures">
          <div>
            <UploadImage
              listType="picture-card"
              showUploadList={{ showPreviewIcon: false }}
              defaultFileList={reviewPics}
              onChange={(info) => handleChange(info)}
              multiple
              maxCount={REVIEW_PHOTO_LIMIT}
            >
              <CameraIcon />
              <PlusIcon />
            </UploadImage>
          </div>
        </Form.Item>

        <Form.Item name="review">
          <StyledInput placeholder="Share you experience..." type="text" />
        </Form.Item>
        <Form.Item>
          <ButtonGroup>
            <StyledButton
              variant="transparent"
              outline="round"
              style={{ marginRight: "20px" }}
              onClick={() => props.setVisible(false)}
            >
              Cancel
            </StyledButton>
            <StyledButton variant="green" outline="round" type="submit">
              Save
            </StyledButton>
          </ButtonGroup>
        </Form.Item>
      </Form>
    </EditContainer>
  );
};

export default EditReview;
