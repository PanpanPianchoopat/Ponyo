import React, { useState, useEffect } from "react";
import {
  StyledNav,
  Logo,
  MenuItem,
  StyledImage,
  Menu,
  BackButton,
} from "./styled";
import MenuButton from "./components/MenuButton";
import { SEARCH, TREND } from "./constant";
import { useRouter } from "next/router";
import { LeftOutlined } from "@ant-design/icons";
import jwt from "jsonwebtoken";

const Navbar = () => {
  const [navVisible, setNavVisible] = useState(true);
  const [menuVisible, setMenuVisible] = useState(true);
  const [selected, setSelected] = useState(SEARCH);
  const router = useRouter();
  const { asPath } = useRouter();

  const handleClick = (menu) => {
    if (menu == SEARCH) {
      setSelected(SEARCH);
      router.push("/search");
    } else if (menu == TREND) {
      setSelected(TREND);
      router.push("/trending");
    }
  };

  const [isGuest, setIsGuest] = useState(true);
  useEffect(() => {
    if (asPath === "/trending") {
      setNavVisible(true);
      setSelected(TREND);
    } else if (asPath === "/search") {
      setNavVisible(true);
      setSelected(SEARCH);
    } else if (asPath === "/login" || asPath === "/register") {
      setNavVisible(false);
    } else if (asPath.startsWith("/restaurant")) {
      setMenuVisible(false);
    } else {
      setNavVisible(true);
      setMenuVisible(true);
      setSelected(null);
    }
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setIsGuest(false);
    } else {
      setIsGuest(true);
    }
  }, [asPath]);

  return (
    <StyledNav isVisible={navVisible}>
      {menuVisible ? (
        <Logo>
          <StyledImage src="/assets/Logo.svg" layout="fill" />
        </Logo>
      ) : (
        <BackButton onClick={() => router.back()}>
          <LeftOutlined style={{ marginRight: "5px" }} />
          BACK
        </BackButton>
      )}
      <Menu>
        <MenuItem
          isVisible={menuVisible}
          onClick={() => handleClick(SEARCH)}
          active={selected === SEARCH}
        >
          Search Restaurant
        </MenuItem>
        <MenuItem
          isVisible={menuVisible}
          onClick={() => handleClick(TREND)}
          active={selected === TREND}
        >
          Discover Trending
        </MenuItem>
        <MenuButton isGuest={isGuest} setIsGuest={setIsGuest} />
      </Menu>
    </StyledNav>
  );
};

export default Navbar;
