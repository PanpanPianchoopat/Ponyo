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

const BestRate = (props) => {
  const isDarkTheme = props.theme === "dark";

  return (
    <BestRateContianer isDark={isDarkTheme}>
      {props.head}
      <Underline isDark={isDarkTheme} />
      <ImageContainer>
        <BigImage>
          <Picture info={props.restaurants[0]} />
        </BigImage>
        <SmallImageContainer>
          <SmallImage>
            <Picture info={props.restaurants[1]} />
          </SmallImage>
          <SmallImage>
            <Picture info={props.restaurants[2]} />
          </SmallImage>
        </SmallImageContainer>
      </ImageContainer>
    </BestRateContianer>
  );
};

export default BestRate;
