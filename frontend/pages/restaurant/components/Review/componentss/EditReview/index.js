import React from "react";
import { Form } from "antd";
import { Rating } from "../../styled";
import { StyledInput } from "../../../WriteReview/styled";
import { ButtonGroup, StyledButton } from "./styled";

const EditReview = (props) => {
  const [newReview] = Form.useForm();

  const handleSave = (value) => {
    console.log("SAVE", value);
    props.setRate(value.rate);
    props.setText(value.review);
    props.setVisible(false);
    props.setSave(true);
  };

  return (
    <div>
      <Form
        form={newReview}
        onFinish={handleSave}
        initialValues={{
          rate: props.review.rate,
          review: props.review.text,
        }}
      >
        <Form.Item name="rate">
          <Rating value={props.review.rate} style={{ fontSize: "30px" }} />
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
    </div>
  );
};

export default EditReview;
