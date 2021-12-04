/*******************************************************************************
 * Navbar component - navigation bar to different pages
 ******************************************************************************/

import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import MenuButton from "./components/MenuButton";
import { SEARCH, TREND } from "./constant";
import { useRouter } from "next/router";
import { LeftOutlined } from "@ant-design/icons";
import {
  StyledNav,
  Logo,
  MenuItem,
  StyledImage,
  Menu,
  BackButton,
  StyledLink,
} from "./styled";
import Link from "next/link";

const Navbar = () => {
  const [navVisible, setNavVisible] = useState(true); // navbar visability
  const [menuVisible, setMenuVisible] = useState(true); // menu items visibility
  const [selected, setSelected] = useState(null); // selected menu
  const [isGuest, setIsGuest] = useState(true); // true if user did not log in
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(router.pathname);

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    /* Set navbar styles according to the path */
    if (currentPath === "/trending") {
      setNavVisible(true);
      setSelected(TREND);
      setMenuVisible(true);
    } else if (currentPath === "/search") {
      setNavVisible(true);
      setSelected(SEARCH);
      setMenuVisible(true);
    } else if (currentPath === "/login" || currentPath === "/register") {
      setNavVisible(false);
    } else if (currentPath.startsWith("/restaurant")) {
      setMenuVisible(false);
    } else {
      setNavVisible(true);
      setMenuVisible(true);
      setSelected(null);
    }

    /* Get user information from token  in local store */
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);

    /* If there is data in token, user has already logged in */
    if (userData) {
      setIsGuest(false);
    } else {
      setIsGuest(true);
    }
  }, [currentPath]);

  return (
    <StyledNav isVisible={navVisible}>
      {menuVisible ? (
        <Logo>
          <StyledImage
            src="/assets/logo.png"
            onClick={() => router.push("/search")}
          />
        </Logo>
      ) : (
        <BackButton onClick={() => router.back()}>
          <LeftOutlined style={{ marginRight: "5px" }} />
          BACK
        </BackButton>
      )}
      <Menu>
        <MenuItem visible={menuVisible} style={{ marginRight: "30px" }}>
          <Link href="/search" onClick={() => setSelected(SEARCH)}>
            <StyledLink isActive={selected == SEARCH}>
              Search Restaurant
            </StyledLink>
          </Link>
        </MenuItem>

        <MenuItem visible={menuVisible}>
          <Link href="/trending" onClick={() => setSelected(TREND)}>
            <StyledLink isActive={selected == TREND}>
              Discover Trending
            </StyledLink>
          </Link>
        </MenuItem>

        <MenuButton isGuest={isGuest} setIsGuest={setIsGuest} />
      </Menu>
    </StyledNav>
  );
};

export default Navbar;
