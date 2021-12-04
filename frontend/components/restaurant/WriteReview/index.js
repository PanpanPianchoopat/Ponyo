/*******************************************************************************
 * WriteReview component - a section to write review about the restaurant.
 * 'resID'      is restaurant ID.
 * 'updateInfo' is a function passed by parent to triggers update restaurant's
 *              data affected from adding new review.
 ******************************************************************************/

import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import ReviewAPI from "../../../pages/api/reviewAPI";
import { useRouter } from "next/router";
import Button from "../../Button";
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
import { REVIEW_PHOTO_LIMIT } from "../constant";

const WriteReview = (props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [userID, setUserID] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [uploadCount, setUploadCount] = useState(0); // count of uploaded file

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setUserID(userData.id);
    }
  }, []);

  /* This function gets image url and forms an array of images url.
   * 'imageList' is array of uploaded image.
   * It returns an array of uploaded images' url.
   */
  const photoArray = (imageList) => {
    const images = [];
    for (let i = 0; i < imageList.length; i++) {
      images[i] = imageList[i].url;
    }
    return images;
  };

  /* This function clears values in the form and empties the image list */
  const clearValue = () => {
    form.resetFields();
    setImageList([]);
  };

  /* This function converts photo to base64 and adds it to the photo array.
   * 'info' is the uploaded file information.
   */
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

  /* This function handle changes made by the Upload component.
   * 'info' is the uploaded file information.
   */
  const handleChange = (info) => {
    const fileType = info.file.type; // uploaded file type
    const isValidFile = fileType === "image/jpeg" || fileType === "image/png";
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

  /* This function handle image removal.
   * 'info' is the target file to be removed information.
   */
  const removeImage = (info) => {
    /* If the image has valid file type, it must be in the list.
     * Therefore, remove the image from the image list */
    if (info.type === "image/jpeg" || info.type === "image/png") {
      const newList = imageList.filter((image) => image.uid !== info.uid);
      setImageList(newList);
    }
    setUploadCount(uploadCount - 1);
  };

  /* This function add review to the restaurant and triggers update for
   * restaurant's informtaion by calling a function passed by parent.
   * 'values' is values filled in the form.
   */
  const onFinish = (values) => {
    const resID = props.resID;
    var reviewPhotos = [];

    if (imageList) {
      reviewPhotos = photoArray(imageList); // form url array of uploaded photos
    }

    if (values.star == 0) {
      message.warning("You have to rate this restaurant");
    } else {
      const data = {
        reviewText: values.review,
        star: values.star,
        image: reviewPhotos,
      };
      ReviewAPI.addReview(userID, resID, data)
        .then((response) => {
          if (response.data) {
            props.updateInfo(true);
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
            <>
              <UploadImage
                listType="picture-card"
                defaultFileList={imageList}
                showUploadList={{ showPreviewIcon: false }}
                onChange={(info) => handleChange(info)}
                onRemove={(info) => removeImage(info)}
                multiple
                maxCount={REVIEW_PHOTO_LIMIT}
              >
                <CameraIcon />
                <PlusIcon />
              </UploadImage>
              <UploadInfo>
                Invalid images won't be upload, valid file count (
                {imageList.length}/{REVIEW_PHOTO_LIMIT})
              </UploadInfo>
              <FullList visible={uploadCount == REVIEW_PHOTO_LIMIT}>
                Reach maximum upload of {REVIEW_PHOTO_LIMIT} files
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
