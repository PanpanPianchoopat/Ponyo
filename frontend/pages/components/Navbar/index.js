import React, { useState } from "react";
import { StyledNav, Logo, MenuItem, StyledImage, Menu } from "./styled";
import MenuButton from "./components/MenuButton";
import { SEARCH, TREND } from "./constant";

const Navbar = () => {
  const [selected, setSelcted] = useState(SEARCH);

  return (
    <StyledNav>
      <Logo>
        <StyledImage src="/assets/Logo.svg" layout="fill" />
      </Logo>
      <Menu>
        <MenuItem
          onClick={() => setSelcted(SEARCH)}
          active={selected === SEARCH}
        >
          Search Restaurant
        </MenuItem>
        <MenuItem onClick={() => setSelcted(TREND)} active={selected === TREND}>
          Discover Trending
        </MenuItem>
        <MenuButton />
      </Menu>
    </StyledNav>
  );
};

export default Navbar;
