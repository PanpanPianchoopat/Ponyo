import React from "react";
import { MenuOutlined } from "@ant-design/icons";
import { LoginButton, HamburgerButton } from "./styled";
import Button from "../../../Button";
import { Menu } from "antd";

const MenuButton = () => {
  const DropdownMenu = (
    <Menu>
      <Menu.Item>Search Restaurant</Menu.Item>
      <Menu.Item>Discover Trending</Menu.Item>
      <Menu.Item>Login</Menu.Item>
    </Menu>
  );
  return (
    <>
      <LoginButton>
        <Button variant="red" outline="round">
          Login
        </Button>
      </LoginButton>
      <HamburgerButton overlay={DropdownMenu} placement="bottomRight" arrow>
        <MenuOutlined />
      </HamburgerButton>
    </>
  );
};

export default MenuButton;
