import React from "react";
import { MY_INTEREST } from "./constant";
import Card from "../../../components/Card";
import { CardsWrapper } from "./styled";

const InterestList = () => {
  return (
    <CardsWrapper>
      {MY_INTEREST.map((detail) => (
        <Card detail={detail} liked={detail.liked} saved={detail.saved} />
      ))}
    </CardsWrapper>
  );
};

export default InterestList;
