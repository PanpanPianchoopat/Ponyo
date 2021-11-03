import React from "react";
import {
  DetailContainer,
  BigContainer,
  SmallContainer,
  Name,
  Underline,
  HeadSection,
} from "./styled";
import WriteReview from "./components/WriteReview";
import Ratings from "./components/Ratings";
import Carousel from "./components/Carousel";
import { SAMPLE_IMAGE } from "./components/Carousel/constant";
import Overview from "./components/Overview";
import Detail from "./components/Detail";

const Restaurant = () => {
  return (
    <div>
      <HeadSection>
        <Name>
          Dek Ying Pungjung
          <Underline />
        </Name>
        <Carousel slides={SAMPLE_IMAGE} />
      </HeadSection>
      <DetailContainer>
        <BigContainer>
          <Overview />
        </BigContainer>
        <SmallContainer>
          <Detail />
        </SmallContainer>
      </DetailContainer>
      <DetailContainer>
        <BigContainer>
          <WriteReview />
        </BigContainer>
        <SmallContainer>
          <Ratings />
        </SmallContainer>
      </DetailContainer>
    </div>
  );
};

export default Restaurant;