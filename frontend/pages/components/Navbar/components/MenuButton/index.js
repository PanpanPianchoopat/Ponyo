import React, { useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { LoginButton, HamburgerButton, MyButton } from "./styled";
import Button from "../../../Button";
import { Menu, Avatar } from "antd";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { BsFillPersonFill } from "react-icons/bs";

const MenuButton = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const DropdownForGuest = (
    <Menu>
      <Menu.Item key="1">Search Restaurant</Menu.Item>
      <Menu.Item key="2">Login</Menu.Item>
    </Menu>
  );
  const DropdownForLogin = (
    <Menu>
      <Menu.Item key="1">Search Restaurant</Menu.Item>
      <Menu.Item key="2" onClick={() => router.push("/trending")}>
        Discover Trending
      </Menu.Item>
      <Menu.Item key="3" onClick={() => router.push("/myAccount")}>
        My Account
      </Menu.Item>
      <Menu.Item key="4">Logout</Menu.Item>
    </Menu>
  );

  const [userID, setUserID] = useState(null);
  const [profile, setProfile] = useState(<BsFillPersonFill />);
  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setUserID(userData.id);
      if (userData.image) {
        setProfile(userData.image);
      }
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      {!loggedIn ? (
        <>
          <LoginButton>
            <Button
              variant="red"
              outline="round"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </LoginButton>
          <HamburgerButton
            destroyPopupOnHide={true}
            overlay={DropdownForGuest}
            placement="bottomRight"
            arrow
          >
            <MenuOutlined />
          </HamburgerButton>
        </>
      ) : (
        <>
          <MyButton src={profile} />
          <HamburgerButton
            destroyPopupOnHide={true}
            overlay={DropdownForLogin}
            placement="bottomRight"
            arrow
          >
            <MenuOutlined />
          </HamburgerButton>
        </>
      )}
    </>
  );
};

export default MenuButton;
