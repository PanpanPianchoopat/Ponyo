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
  UploadInfo,
  FullList,
  PlusIcon,
  CameraIcon,
} from "./styled";
import { Form, Divider, message, Popconfirm } from "antd";

const WriteReview = (props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [user_id, setUserID] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [uploadCount, setUploadCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setUserID(userData.id);
    }
  }, []);

  const photoArray = (imageList) => {
    const images = [];
    for (let i = 0; i < imageList.length; i++) {
      images[i] = imageList[i].url;
    }
    return images;
  };

  const clearValue = () => {
    console.log("CLEAR");
    form.resetFields();
    setImageList([]);
  };

  const onFinish = (values) => {
    const resID = props.resID;
    var reviewPhotos = [];

    if (imageList) {
      reviewPhotos = photoArray(imageList);
    }

    if (values.star == 0) {
      message.warning("You have to rate this restaurant");
    } else {
      const data = {
        reviewText: values.review,
        star: values.star,
        image: reviewPhotos,
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

  function getBase64(info) {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      setImageList([
        ...imageList,
        {
          uid: info.file.uid,
          name: info.file.name,
          status: "done",
          url: reader.result,
        },
      ])
    );
    reader.readAsDataURL(info.file.originFileObj);
  }

  const handleChange = (info) => {
    const isValidFile =
      info.file.type === "image/jpeg" || info.file.type === "image/png";
    const doneUploading = info.file.status === "done";
    if (doneUploading) {
      setUploadCount(uploadCount + 1);
      if (isValidFile) {
        getBase64(info);
      } else {
        message.error("Invalid file type, review image must be jpeg or png");
      }
    }
  };

  const removeImage = (info) => {
    if (info.type === "image/jpeg" || info.type === "image/png") {
      const newList = imageList.filter((image) => image.uid !== info.uid);
      setImageList(newList);
    }
    setUploadCount(uploadCount - 1);
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
            <>
              <UploadImage
                listType="picture-card"
                defaultFileList={imageList}
                showUploadList={{ showPreviewIcon: false }}
                onChange={(info) => handleChange(info)}
                onRemove={(info) => removeImage(info)}
                multiple
                maxCount={5}
              >
                <CameraIcon />
                <PlusIcon />
              </UploadImage>
              <UploadInfo>
                Invalid images won't be upload, valid file count (
                {imageList.length}/5)
              </UploadInfo>
              <FullList visible={uploadCount == 5}>
                Reach maximum upload of 5 files
              </FullList>
            </>
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
                <Button variant="transparent" outline="round" type="button">
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
