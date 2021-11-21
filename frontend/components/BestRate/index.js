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
  const [restaurantTrend, setRestaurantTrend] = useState(null);
  const [countTrend, setCountTrend] = useState(0);

  useEffect(() => {
    console.log(props.head, " ", "countTrend", countTrend);
  }, [countTrend]);

  useEffect(() => {
    if (props.isNotNull && props.restaurants.length > 0) {
      setRestaurantTrend(props.restaurants);
      setCountTrend(props.restaurants.length);
      console.log(props.head, " ", props.restaurants[0].data[0]._id);
    }
  }, [props]);

  return (
    <BestRateContianer isDark={isDarkTheme}>
      {props.head}
      <Underline isDark={isDarkTheme} />
      <ImageContainer>
        <BigImage>
          <Picture
            info={(countTrend >= 1) ? restaurantTrend[TOP].data[0] : null}
            isTop={true}
          />
        </BigImage>
        <SmallImageContainer>
          <SmallImage>
            <Picture
              info={(countTrend >= 2) ? restaurantTrend[SECOND].data[0] : null}
              isTop={false}
            />
          </SmallImage>
          <SmallImage>
            <Picture
              info={(countTrend >= 3) ? restaurantTrend[THIRD].data[0] : null}
              isTop={false}
            />
          </SmallImage>
        </SmallImageContainer>
      </ImageContainer>
    </BestRateContianer>
  );
};

export default BestRate;
