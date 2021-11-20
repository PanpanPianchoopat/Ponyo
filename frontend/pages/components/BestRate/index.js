import React, { useState, useEffect } from "react";
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
  const [restaurantTrend, setRestaurantTrend] = useState(props.restaurants);

  useEffect(() => {
    setRestaurantTrend(props.restaurants);
  }, [props.restaurants]);

  useEffect(() => {
    console.log("restaurantTrend", restaurantTrend);
  }, [restaurantTrend]);

  return (
    <BestRateContianer isDark={isDarkTheme}>
      {props.head}
      <Underline isDark={isDarkTheme} />
      <ImageContainer>
        <BigImage>
          <Picture
            info={restaurantTrend ? restaurantTrend[TOP] : null}
            isTop={true}
          />
        </BigImage>
        <SmallImageContainer>
          <SmallImage>
            <Picture
              info={restaurantTrend ? restaurantTrend[SECOND] : null}
              isTop={false}
            />
          </SmallImage>
          <SmallImage>
            <Picture
              info={restaurantTrend ? restaurantTrend[THIRD] : null}
              isTop={false}
            />
          </SmallImage>
        </SmallImageContainer>
      </ImageContainer>
    </BestRateContianer>
  );
};

export default BestRate;
