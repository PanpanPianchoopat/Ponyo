import React, { useRef, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import {
  StyledRate,
  SectionHeader,
  WriteReviewInnnerContainer,
  StyledInput,
  ButtonGroup,
  UploadImage,
  PlusIcon,
  CameraIcon,
} from "./styled";
import { Form, Divider, message } from "antd";
import Button from "../../../components/Button";
import ReviewAPI from "../../../api/reviewAPI";
import { useRouter } from "next/router";

const WriteReview = (props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [user_id, setUserID] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setUserID(userData.id);
    }
  }, []);

  const photoArray = (fileList) => {
    var i = 0;
    const image = [];
    while (i < fileList.length) {
      image[i] = fileList[i].thumbUrl;
      i++;
    }
    return image;
  };

  const onFinish = (values) => {
    const res_id = "617aeb9ca6287c38c323f851";
    var image = [];

    if (values.pictures != undefined) {
      image = photoArray(values.pictures.fileList);
    }

    const data = {
      reviewText: values.review,
      star: values.star,
      image: image,
    };

    ReviewAPI.addReview(user_id, res_id, data)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          props.func(true);
          router.reload();
        } else {
          message.warning(
            "You already review this restaurant, try edit/delete instead"
          );
        }
      })
      .catch((e) => {
        console.log("Already review");
        message.warning(
          "You already review this restaurant, try edit/delete instead"
        );
      });
  };

  const onFinishFailed = (error) => {
    console.log("Failed:", error);
  };

  return (
    <>
      <WriteReviewInnnerContainer>
        <SectionHeader>Write a Review</SectionHeader>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            star: 0,
            review: "",
          }}
        >
          <Form.Item name="star">
            <StyledRate />
          </Form.Item>
          <Divider />
          <Form.Item name="pictures">
            <UploadImage
              listType="picture-card"
              beforeUpload={() => false}
              showUploadList={{ showPreviewIcon: false }}
              multiple
            >
              <CameraIcon />
              <PlusIcon />
            </UploadImage>
          </Form.Item>
          <Form.Item name="review">
            <StyledInput placeholder="Share you experience..." type="text" />
          </Form.Item>
          <Form.Item>
            <ButtonGroup>
              <Button variant="transparent" outline="round" type="button">
                Cancel
              </Button>
              <Button variant="red" outline="round" type="submit">
                Submit
              </Button>
            </ButtonGroup>
          </Form.Item>
        </Form>
      </WriteReviewInnnerContainer>
    </>
  );
};

export default WriteReview;
