import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import { setAuthState } from "../../../../../slices/auth";

import { LOGIN_MENU } from "./constant";

import { MenuOutlined } from "@ant-design/icons";
import { Menu, Avatar } from "antd";
import Button from "../../../Button";
import { BsFillPersonFill } from "react-icons/bs";
import {
  LoginButton,
  AvatarButton,
  DynamicButton,
  HamburgerButton,
} from "./styled";

const MenuButton = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setAuthState());
    props.setIsGuest(true);
    localStorage.clear();
    router.push("/search");
  };

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
