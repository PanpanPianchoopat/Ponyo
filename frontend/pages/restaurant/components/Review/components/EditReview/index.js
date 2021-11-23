import React, { useEffect, useState, useCallback } from "react";
import { Form, message } from "antd";
import { Rating } from "../../styled";
import { EditContainer, ButtonGroup, StyledButton } from "./styled";
import {
  StyledInput,
  UploadImage,
  CameraIcon,
  PlusIcon,
} from "../../../WriteReview/styled";

const EditReview = (props) => {
  const [newReview] = Form.useForm();

  const [reviewPics, setReviewPics] = useState([]);
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

  const handleChange = (info) => {
    const status = info.file.status;
    if (status === "done") {
      getBase64(info);
    } else if (status === "removed") {
      setReviewPics(reviewPics.filter((item) => item.uid !== info.file.uid));
    }
  };

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
              maxCount={5}
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
