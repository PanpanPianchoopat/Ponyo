import React, { useRef } from "react";
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
import { Form, Divider } from "antd";
import Button from "../../../components/Button";
import RestaurantAPI from "../../../api/restaurantAPI";

const WriteReview = () => {
  const [form] = Form.useForm();

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
    const user_id = "618d4610965a69dd7993e663";
    const res_id = "617d07fb8f7c593a9e729a56";
    var image = null;

    if (values.pictures != undefined) {
      image = photoArray(values.pictures.fileList);
    }

    const data = {
      reviewText: values.review,
      star: values.star,
      image: image,
    };

    RestaurantAPI.addReview(user_id, res_id, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log("Write Review Not Success");
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
