import React, { useState } from "react";
import { StyledNav, Logo, MenuItem, StyledImage, Menu } from "./styled";
import MenuButton from "./components/MenuButton";
import { SEARCH, TREND } from "./constant";
import { useRouter } from "next/router";

const Navbar = () => {
  const [selected, setSelcted] = useState(SEARCH);
  const router = useRouter();

  const handleClick = (menu) => {
    if (menu == SEARCH) {
      setSelcted(SEARCH);
      router.push("/search");
    } else if (menu == TREND) {
      setSelcted(TREND);
      router.push("/trending");
    }
  };

  return (
    <StyledNav>
      <Logo>
        <StyledImage src="/assets/Logo.svg" layout="fill" />
      </Logo>
      <Menu>
        <MenuItem
          onClick={() => handleClick(SEARCH)}
          active={selected === SEARCH}
        >
          Search Restaurant
        </MenuItem>
        <MenuItem
          onClick={() => handleClick(TREND)}
          active={selected === TREND}
        >
          Discover Trending
        </MenuItem>
        <MenuButton />
      </Menu>
    </StyledNav>
  );
};

export default Navbar;
