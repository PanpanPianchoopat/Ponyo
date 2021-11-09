import React from "react";
import {
  BestRateContianer,
  Underline,
  ImageContainer,
  BigImage,
  SmallImageContainer,
  SmallImage,
} from "./styled";
import Picture from "./components/Picture";
import { TOP, SECOND, THIRD } from "./constant";

const BestRate = (props) => {
  const isDarkTheme = props.theme === "dark";

  return (
    <BestRateContianer isDark={isDarkTheme}>
      {props.head}
      <Underline isDark={isDarkTheme} />
      <ImageContainer>
        <BigImage>
          <Picture info={props.restaurants[TOP]} isTop={true} />
        </BigImage>
        <SmallImageContainer>
          <SmallImage>
            <Picture info={props.restaurants[SECOND]} isTop={false} />
          </SmallImage>
          <SmallImage>
            <Picture info={props.restaurants[THIRD]} isTop={false} />
          </SmallImage>
        </SmallImageContainer>
      </ImageContainer>
    </BestRateContianer>
  );
};

export default BestRate;
