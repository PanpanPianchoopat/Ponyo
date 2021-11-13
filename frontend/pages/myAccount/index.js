import React, { useState, useEffect } from "react";
import { Avatar, Modal, Form, Input } from "antd";
import Button from "../components/Button";
import RestList from "./components/RestList";
import { PROFILE, FAVOURITE, INTEREST } from "./constant";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import {
  ProfileContainer,
  ProfilePicture,
  ListContainer,
  TabContainer,
  Menu,
  List,
} from "./styled";

const myAccount = () => {
  const [selectedTab, setSelectedTab] = useState(FAVOURITE);
  const [profileForm] = Form.useForm();

  const { confirm } = Modal;
  function warning() {
    confirm({
      title: "Edit Porfile",
      icon: <ExclamationCircleOutlined />,
      footer: null,
      content: (
        <Form form={profileForm}>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Current Password" name="old_pass">
            <Input />
          </Form.Item>
          <Form.Item label="New Password" name="new_pass">
            <Input />
          </Form.Item>
        </Form>
      ),
      onOk() {
        //profileForm.submit;
        console.log("OK");
      },
      onCancel() {
        console.log("CANCEL");
      },
    });
  }

  return (
    <ProfileContainer>
      <ProfilePicture>
        <Avatar size={100} src={PROFILE.profilePic} />
        <h3>{PROFILE.name}</h3>
      </ProfilePicture>
      <Button variant="transparent" onClick={warning}>
        Edit Profile
      </Button>

      <ListContainer>
        <TabContainer>
          <Menu
            onClick={() => setSelectedTab(FAVOURITE)}
            isSelected={selectedTab == FAVOURITE}
          >
            My Favourite
          </Menu>
          <Menu
            onClick={() => setSelectedTab(INTEREST)}
            isSelected={selectedTab == INTEREST}
          >
            My Interests
          </Menu>
        </TabContainer>
        <List>
          {selectedTab == FAVOURITE ? (
            <RestList type={FAVOURITE} />
          ) : (
            <RestList type={INTEREST} />
          )}
        </List>
      </ListContainer>
    </ProfileContainer>
  );
};

export default myAccount;
