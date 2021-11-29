import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Picture from "./components/Picture";
import { TOP, SECOND, THIRD } from "./constant";
import {
  BestRateContianer,
  Underline,
  ImageContainer,
  BigImage,
  SmallImageContainer,
  SmallImage,
} from "./styled";

const BestRate = (props) => {
  const isDarkTheme = props.theme === "dark";
  const [restaurantTrend, setRestaurantTrend] = useState(null);
  const [countTrend, setCountTrend] = useState(0);

  useEffect(() => {
    if (props.restaurants) {
      if (props.isNotNull && props.restaurants.length > 0) {
        setRestaurantTrend(props.restaurants);
        setCountTrend(props.restaurants.length);
      }
    }
  }, [props]);

  const router = useRouter();
  const goToDetail = (index) => {
    router.push(`/restaurant/${restaurantTrend[index].data[0]._id}`);
  };

  return (
    <BestRateContianer isDark={isDarkTheme}>
      {props.head}
      <Underline isDark={isDarkTheme} />
      <ImageContainer>
        <BigImage onClick={() => goToDetail(TOP)}>
          <Picture
            info={countTrend >= 1 ? restaurantTrend[TOP].data[0] : null}
            isTop={true}
          />
        </BigImage>
        <SmallImageContainer>
          <SmallImage onClick={() => goToDetail(SECOND)}>
            <Picture
              info={countTrend >= 2 ? restaurantTrend[SECOND].data[0] : null}
              isTop={false}
            />
          </SmallImage>
          <SmallImage onClick={() => goToDetail(THIRD)}>
            <Picture
              info={countTrend >= 3 ? restaurantTrend[THIRD].data[0] : null}
              isTop={false}
            />
          </SmallImage>
        </SmallImageContainer>
      </ImageContainer>
    </BestRateContianer>
  );
};

export default BestRate;
