import React, { useState } from "react";
import { StyledNav, Logo, MenuItem, StyledImage, Menu } from "./styled";
import MenuButton from "./components/MenuButton";

const Navbar = () => {
  const [selected, setSelcted] = useState("list");

  return (
    <StyledNav>
      <Logo>
        <StyledImage src="/assets/Logo.svg" layout="fill" />
      </Logo>
      <Menu>
        <MenuItem
          onClick={() => setSelcted("list")}
          active={selected === "list"}
        >
          Search Restaurant
        </MenuItem>
        <MenuItem
          onClick={() => setSelcted("trend")}
          active={selected === "trend"}
        >
          Discover Trending
        </MenuItem>
        <MenuButton />
      </Menu>
    </StyledNav>
  );
};

export default Navbar;
