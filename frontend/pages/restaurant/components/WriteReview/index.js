import React, { useRef, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import ReviewAPI from "../../../api/reviewAPI";
import { useRouter } from "next/router";
import Button from "../../../../components/Button";
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
import { Form, Divider, message, Popconfirm } from "antd";

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

  const clearValue = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    const resID = props.resID;
    var image = [];

    if (values.pictures != undefined) {
      image = photoArray(values.pictures.fileList);
    }

    if (image.length > 5) {
      message.warning("You can upload images only up to 5");
    } else if (values.star == 0) {
      message.warning("You have to rate this restaurant");
    } else {
      const data = {
        reviewText: values.review,
        star: values.star,
        image: image,
      };
      ReviewAPI.addReview(user_id, resID, data)
        .then((response) => {
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
          message.warning(
            "You already review this restaurant, try edit/delete instead"
          );
        });
    }
  };

  return (
    <>
      <WriteReviewInnnerContainer>
        <SectionHeader>Write a Review</SectionHeader>
        <Form
          form={form}
          onFinish={onFinish}
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
              <Popconfirm
                title="Are you sure to delete your review?"
                placement="topRight"
                onConfirm={clearValue}
              >
                <Button
                  variant="transparent"
                  outline="round"
                  type="button"
                >
                  Cancel
                </Button>
              </Popconfirm>
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
