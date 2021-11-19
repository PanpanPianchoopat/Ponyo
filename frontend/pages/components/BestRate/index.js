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
  if (props != null) {
    console.log(props);
  }

  return (
    <BestRateContianer isDark={isDarkTheme}>
      {props.head}
      <Underline isDark={isDarkTheme} />
      <ImageContainer>
        <BigImage>
          <Picture
            info={props[TOP] ? props[TOP].data[TOP] : null}
            isTop={true}
          />
        </BigImage>
        <SmallImageContainer>
          <SmallImage>
            <Picture
              info={props[SECOND] ? props[SECOND].data[TOP] : null}
              isTop={false}
            />
          </SmallImage>
          <SmallImage>
            <Picture
              info={props[THIRD] ? props[THIRD].data[TOP] : null}
              isTop={false}
            />
          </SmallImage>
        </SmallImageContainer>
      </ImageContainer>
    </BestRateContianer>
  );
};

export default BestRate;
