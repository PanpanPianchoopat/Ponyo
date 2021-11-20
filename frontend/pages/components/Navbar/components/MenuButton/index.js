import React, { useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { LoginButton, HamburgerButton, AvatarButton } from "./styled";
import Button from "../../../Button";
import { Menu, Avatar } from "antd";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { BsFillPersonFill } from "react-icons/bs";
import { LOGIN_MENU } from "./constant";

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
      {LOGIN_MENU.map((item) => (
        <Menu.Item key={item.key} onClick={() => router.push(item.path)}>
          {item.name}
        </Menu.Item>
      ))}
      <Menu.Item key="logout">Log out</Menu.Item>
    </Menu>
  );

  const [profile, setProfile] = useState(<BsFillPersonFill />);
  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
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
          <AvatarButton
            destroyPopupOnHide={true}
            overlay={DropdownForLogin}
            placement="bottomRight"
            arrow
          >
            <Avatar src={profile} />
          </AvatarButton>
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
