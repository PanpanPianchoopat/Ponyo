import React, { useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import {
  LoginButton,
  HamburgerButton,
  AvatarButton,
  DynamicButton,
} from "./styled";
import Button from "../../../Button";
import { Menu, Avatar } from "antd";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { BsFillPersonFill } from "react-icons/bs";
import { LOGIN_MENU } from "./constant";

const MenuButton = (props) => {
  const router = useRouter();

  const DropdownForGuest = (
    <Menu>
      <Menu.Item key="1" onClick={() => router.push("/search")}>
        Search Restaurant
      </Menu.Item>
      <Menu.Item key="2" onClick={() => router.push("/login")}>
        Login
      </Menu.Item>
    </Menu>
  );

  const handleLogout = () => {
    props.setIsGuest(true);
    localStorage.clear();
  };

  const DropdownForLogin = (
    <Menu>
      {LOGIN_MENU.map((item) => (
        <Menu.Item key={item.key} onClick={() => router.push(item.path)}>
          {item.name}
        </Menu.Item>
      ))}
      <Menu.Item key="logout" onClick={() => handleLogout()}>
        Log out
      </Menu.Item>
    </Menu>
  );

  const [avatar, setAvatar] = useState(<Avatar icon={<BsFillPersonFill />} />);
  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      if (userData.image) {
        setAvatar(<Avatar src={userData.image} />);
      }
    }
  }, [props.isGuest]);

  return (
    <>
      <DynamicButton isVisible={props.isGuest}>
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
          overlay={DropdownForGuest}
          placement="bottomRight"
          arrow
        >
          <MenuOutlined />
        </HamburgerButton>
      </DynamicButton>

      <DynamicButton isVisible={!props.isGuest}>
        <AvatarButton overlay={DropdownForLogin} placement="bottomRight" arrow>
          {avatar}
        </AvatarButton>
        <HamburgerButton
          overlay={DropdownForLogin}
          placement="bottomRight"
          arrow
        >
          <MenuOutlined />
        </HamburgerButton>
      </DynamicButton>
    </>
  );
};

export default MenuButton;
