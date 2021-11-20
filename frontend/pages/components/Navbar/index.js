import React, { useState, useEffect } from "react";
import { StyledNav, Logo, MenuItem, StyledImage, Menu } from "./styled";
import MenuButton from "./components/MenuButton";
import { SEARCH, TREND } from "./constant";
import { useRouter } from "next/router";

const Navbar = () => {
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

  useEffect(() => {
    if (asPath === "/trending") {
      setSelected(TREND);
    } else if (asPath === "/search") {
      setSelected(SEARCH);
    } else {
      setSelected(null);
    }
  }, [asPath]);

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
