import React, { useState } from "react";
import { StyledNav, Logo, MenuItem } from "./styled";
import Image from "next/image";

const Navbar = () => {
  const [selected, setSelcted] = useState("list");

  return (
    <StyledNav>
      <Logo>
        <Image src="/assets/Logo.svg" width="45px" height="45px" />
      </Logo>
      <MenuItem onClick={() => setSelcted("list")} active={selected === "list"}>
        Search Restaurant
      </MenuItem>
      <MenuItem
        onClick={() => setSelcted("trend")}
        active={selected === "trend"}
      >
        Discover Trending
      </MenuItem>
    </StyledNav>
  );
};

export default Navbar;
