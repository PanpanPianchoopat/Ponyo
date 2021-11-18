import React, { useEffect, useState, useCallback } from "react";
import { Form, message } from "antd";
import { Rating } from "../../styled";
import {
  StyledInput,
  UploadImage,
  CameraIcon,
  PlusIcon,
} from "../../../WriteReview/styled";
import { EditContainer, ButtonGroup, StyledButton } from "./styled";
import SkeletonImage from "antd/lib/skeleton/Image";

const EditReview = (props) => {
  const [newReview] = Form.useForm();

  // const [reviewPics, setReviewPics] = useState([]);
  // useEffect(() => {
  //   for (let i = 0; i < props.review.photos.length; i++) {
  //     reviewPics.push({
  //       uid: -i,
  //       name: `pic${i}`,
  //       status: "done",
  //       url: props.review.photos[i],
  //     });
  //   }
  // }, []);

  // function deleteImage(name) {
  //   setReviewPics(reviewPics.filter((item) => item.name !== name));
  //   return 0;
  // }

  // const getBase64 = (file) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () =>
  //     reviewPics.push({
  //       uid: file.uid,
  //       name: file.name,
  //       status: "done",
  //       url: reader.result,
  //     })
  //   );
  //   reader.readAsDataURL(file.originFileObj);
  //   console.log("NEW_ARRAY", reviewPics);
  // };

  // const [image, setImage] = useState(null);

  // const handleChange = useCallback((info) => {
  //   console.log(info.file);
  //   console.log(info.file.status);
  //   if (info.file.status === "uploading") {
  //     setImage({ loading: true, image: null });
  //     info.file.status = "done";
  //   }
  //   if (info.file.status === "removed") {
  //     const result = deleteImage(info.file.name);
  //     if (result != 0) {
  //       message.error("Failed to delete picture");
  //     }
  //   } else if (info.file.status === "done") {
  //     getBase64(info.file, (imageUrl) => {
  //       const img = new Image();
  //       img.src = imageUrl;
  //       img.addEventListener("load", function () {
  //         setImage({ loading: false, image: imageUrl });
  //         //setReviewPics([{ ...info.fileList }]);
  //       });
  //     });
  //   }
  // }, []);

  const handleSave = (value) => {
    console.log("SAVE", value);
    props.setRate(value.rate);
    props.setText(value.review);
    props.setVisible(false);
  };

  return (
    <EditContainer>
      <Form
        form={newReview}
        onFinish={handleSave}
        initialValues={{
          rate: props.review.rate,
          review: props.review.text,
          uploadPhoto: [],
        }}
      >
        <Form.Item name="rate">
          <Rating value={props.review.rate} style={{ fontSize: "30px" }} />
        </Form.Item>

        {/* <Form.Item name="pictures">
          <UploadImage
            listType="picture-card"
            //beforeUpload={() => false}
            showUploadList={{ showPreviewIcon: false }}
            fileList={reviewPics}
            onChange={(info) => handleChange(info)}
            multiple
          >
            <CameraIcon />
            <PlusIcon />
          </UploadImage>
        </Form.Item> */}

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
