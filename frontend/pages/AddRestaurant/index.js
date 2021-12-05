/*******************************************************************************
 * AddRestaurant page - add restaurant information
 ******************************************************************************/
import React from "react";
import {
  Form,
  Input,
  Select,
  TimePicker,
  Button,
  Upload,
  Checkbox,
} from "antd";
import {
  REST_TYPE,
  MAX_IMAGE,
  DAYS_OF_WEEK,
} from "../../public/constant/addRestaurant";
import { UploadOutlined } from "@ant-design/icons";
import RestaurantAPI from "../api/restaurantAPI.js";

const AddRestaurant = () => {
  const [form] = Form.useForm();

  /* This function separate time from full format into HH
   * and mm format.
   * 'openHour' is open hour in full format
   * It returns array of openTime
   */
  const convertTime = (openHour) => {
    const openTime = [0, 0, 0, 0];
    openTime[0] = parseInt(openHour[0].format("HH"));
    openTime[1] = parseInt(openHour[0].format("mm"));
    openTime[2] = parseInt(openHour[1].format("HH"));
    openTime[3] = parseInt(openHour[1].format("mm"));

    return openTime;
  };

  /* This function is used to add the photo to the array
   * 'fileList' is list of all photos
   * It returns array of photo
   */
  const photoArray = (fileList) => {
    var i = 0;
    const photo = [];
    while (i < fileList.length) {
      photo[i] = fileList[i].thumbUrl;
      i++;
    }
    return photo;
  };

  /* This function will add the restaurant to database.
   * 'values' is values in the form
   */
  const onFinish = (values) => {
    const openTime = convertTime(values.openHour);
    const photo = photoArray(values.photos.fileList);

    if (values.closingDay == undefined) {
      values.closingDay = [];
    }
    const data = {
      name: values.name,
      type: values.type,
      description: values.description,
      address: values.address,
      ggLink: values.link,
      phone: values.phone,
      min: values.minPrice,
      max: values.maxPrice,
      closingDay: values.closingDay,
      openHour: openTime,
      image: photo,
    };

    RestaurantAPI.addRestaurant(data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /* This function will print the error when fail
   * 'error' is an error that occur
   */
  const onFinishFailed = (error) => {
    console.log("Failed:", error);
  };

  /* This function is used to reset the fields in form */
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item>
        <Form.Item name="gender"></Form.Item>
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
