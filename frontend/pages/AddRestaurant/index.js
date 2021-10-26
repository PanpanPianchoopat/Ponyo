import React, { useState } from "react";
import { Form, Input, Select, TimePicker, Upload, Modal, Button } from "antd";
import { REST_TYPE } from "./constant";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const AddRestaurant = () => {
  const [form] = Form.useForm();
  const [load, setLoad] = useState(false);
  const { loading, imageUrl } = load;

  // const state = {
  //   loading: false,
  // };

  // const { loading, imageUrl } = state;

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      // this.setState({ loading: true });
      setLoad(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        // this.setState({
        //   imageUrl,
        //   loading: false,
        // })
        setLoad(false)
      );
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form form={form}>
      <Form.Item name="name" label="rest name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="type" label="type" rules={[{ required: true }]}>
        <Select>
          {REST_TYPE.map((type) => {
            return <Select.Option>{type}</Select.Option>;
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="description"
        label="description"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="address" label="address" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="location" label="location (link)">
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="phone number">
        <Input />
      </Form.Item>
      <Form.Item name="range" label="price range">
        <Form.Item style={{ display: "inline-block" }}>
          <Input placeholder="from" />
        </Form.Item>
        <Form.Item style={{ display: "inline-block" }}>
          <Input placeholder="to" />
        </Form.Item>
      </Form.Item>
      <Form.Item name="open" label="opening time">
        <TimePicker.RangePicker />
      </Form.Item>
      <Form.Item name="holiday" label="holiday">
        <Input />
      </Form.Item>
      <Form.Item name="picture" label="pictures (optional)">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            <div>
              <PlusOutlined />
            </div>
          )}
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" style={{ marginRight: "20px" }}>
          Submit
        </Button>
        <Button onClick={onReset}>Reset</Button>
      </Form.Item>
    </Form>
  );
};

export default AddRestaurant;
