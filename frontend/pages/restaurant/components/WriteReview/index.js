import React, { useRef } from "react";
import {
  StyledRate,
  SectionHeader,
  WriteReviewInnnerContainer,
  StyledInput,
  ButtonGroup,
} from "./styled";
import { Form, Divider, Upload } from "antd";
import Button from "../../../components/Button";

const WriteReview = () => {
  const [form] = Form.useForm();
  const review = useRef();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (error) => {
    console.log("Failed:", error);
  };
  return (
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
          <Divider />
        </Form.Item>
        <Form.Item name="pictures">
          <Upload listType="picture" beforeUpload={() => false} />
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
  );
};

export default WriteReview;