import React, { useState, useEffect } from "react";
import { TOP_5 } from "./constant";
import { Avatar } from "antd";
import Button from "../components/Button";
import EditList from "./components/EditList";
import {
  ProfileContainer,
  ProfilePicture,
  ListContainer,
  TabContainer,
  Menu,
  List,
  Popup,
} from "./styled";
import { PROFILE } from "./constant";
import FavList from "./components/FavList";
import InterestList from "./components/InterestList";

const FAVOURITE = 0;
const INTEREST = 1;

const myAccount = () => {
  const [selectedTab, setSelectedTab] = useState(FAVOURITE);

  const [popupVisible, setPopupVisible] = useState(false);
  useEffect(() => {
    console.log("VISIBLE", popupVisible);
  }, [popupVisible]);

  return (
    <ProfileContainer>
      <ProfilePicture>
        <Avatar size={100} src={PROFILE.profilePic} />
        <h3>{PROFILE.name}</h3>
      </ProfilePicture>
      <Button variant="transparent">Edit Profile</Button>

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
            <>
              Top 5 Favourite Restaurant
              <FavList />
            </>
          ) : (
            <>
              Interesting Restaurant
              <InterestList />
            </>
          )}
        </List>
      </ListContainer>
      <Button variant="transparent" onClick={() => setPopupVisible(true)}>
        Edit List
      </Button>

      <Popup
        title="Edit Top 5 Favourite List"
        visible={popupVisible}
        okText="Save"
        onOk={() => setPopupVisible(false)}
        onCancel={() => setPopupVisible(false)}
      >
        <EditList list={TOP_5} />
      </Popup>
    </ProfileContainer>
  );
};

export default myAccount;
