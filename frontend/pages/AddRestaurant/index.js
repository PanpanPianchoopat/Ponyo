import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  TimePicker,
  Button,
  Upload,
  Checkbox,
} from "antd";
import { REST_TYPE, MAX_IMAGE, DAYS_OF_WEEK } from "./constant";
import { UploadOutlined } from "@ant-design/icons";

const AddRestaurant = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    //console.log("startTime:", values.openHour[0].format("HH:mm"));
    // const startHour = values.openHour[0].format("HH");
    // const startMin = values.openHour[0].format("mm");
    // console.log(startHour, startMin);
    //console.log("endTime:", values.openHour[1].format("HH:mm"));
    //console.log("Image", values.photos.fileList[0].thumbUrl);
  };

  const onFinishFailed = (error) => {
    console.log("Failed:", error);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item>
        <Form.Item
          name="name"
          label="rest name"
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="type"
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Select>
            {REST_TYPE.map((type) => {
              return <Select.Option key={type}>{type}</Select.Option>;
            })}
          </Select>
        </Form.Item>
      </Form.Item>
      <Form.Item name="description" label="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="address" label="address">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="link" label="location (link)">
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="phone number">
        <Input />
      </Form.Item>
      <Form.Item label="price range">
        <Form.Item name="minPrice" style={{ display: "inline-block" }}>
          <Input placeholder="from" />
        </Form.Item>
        <Form.Item name="maxPrice" style={{ display: "inline-block" }}>
          <Input placeholder="to" />
        </Form.Item>
      </Form.Item>
      <Form.Item name="openHour" label="service hour">
        <TimePicker.RangePicker minuteStep={5} format={"HH:mm"} />
      </Form.Item>
      <Form.Item name="closingDay" label="closed on">
        <Checkbox.Group>
          {DAYS_OF_WEEK.map((day) => {
            return (
              <Checkbox key={day} value={day}>
                {day}s
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      </Form.Item>
      <Form.Item name="holiday" label="special holiday">
        <Input />
      </Form.Item>
      <Form.Item name="photos" label="pictures (optional)">
        <Upload
          beforeUpload={() => false}
          listType="picture"
          maxCount={MAX_IMAGE}
          multiple
        >
          <Button icon={<UploadOutlined />}>Upload (Max: {MAX_IMAGE})</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          style={{ marginRight: "20px" }}
          htmlType="submit"
        >
          Submit
        </Button>
        <Button onClick={onReset}>Reset</Button>
      </Form.Item>
    </Form>
  );
};

export default AddRestaurant;
