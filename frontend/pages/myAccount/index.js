/*******************************************************************************
 * myAccount page - user's personal page consisted of his/her profile and
 *                  lists of favourite restaurants and interesing restaurant
 *                  that he/she has liked/saved.
 ******************************************************************************/

import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { Avatar } from "antd";
import Button from "../../components/Button";
import RestList from "./components/RestList";
import EditProfile from "./components/EditProfile";
import { useRouter } from "next/router";
import {
  FAVOURITE,
  INTEREST,
  AVATAR_SIZE,
} from "../../public/constant/myAccount";
import {
  ProfileContainer,
  ProfilePicture,
  ListContainer,
  TabContainer,
  Menu,
  List,
  Popup,
  DefaultProfile,
} from "./styled";

const myAccount = () => {
  const [selectedTab, setSelectedTab] = useState(FAVOURITE);
  const [popupVisible, setPopupVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    setUserData(userData);
    if (!userData) {
      router.push("/error");
    }
  }, []);

  // Set avatar image to default picture if the user has no profile picture.
  const [avatar, setAvatar] = useState(
    <Avatar size={AVATAR_SIZE} src={<DefaultProfile />} />
  );

  useEffect(() => {
    if (userData) {
      // If user has profile image, set the avatar to his/her profile image.
      if (userData.image) {
        setAvatar(<Avatar size={AVATAR_SIZE} src={userData.image} />);
      }
    }
  }, [userData]);

  // Set default list to display as favourite restaurant list.
  const [restList, setRestList] = useState(<RestList type={FAVOURITE} />);

  useEffect(() => {
    // Change the list according to the list type that user selected.
    if (selectedTab == INTEREST) {
      setRestList(<RestList type={INTEREST} />);
    } else if (selectedTab == FAVOURITE) {
      setRestList(<RestList type={FAVOURITE} />);
    }
  }, [selectedTab]);

  return (
    <ProfileContainer>
      <ProfilePicture>
        {avatar}
        <h3>{userData ? userData.username : null}</h3>
      </ProfilePicture>
      <Button variant="transparent" onClick={() => setPopupVisible(true)}>
        Edit Profile
      </Button>
      <Popup
        title="Edit Profile"
        visible={popupVisible}
        onCancel={() => setPopupVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <EditProfile info={userData} popupVisible={setPopupVisible} />
      </Popup>

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
        <List>{restList}</List>
      </ListContainer>
    </ProfileContainer>
  );
};

export default myAccount;
