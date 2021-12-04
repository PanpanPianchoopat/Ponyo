/*******************************************************************************
 * BestRate component - display top 3 restaurants.
 * 'theme'        is the compoenent theme. If this field is set to 'dark',
 *                background color would become dark and text color would be
 *                white. Otherwise, background is white and text color is dark.
 * 'restaurants'  is array of top 3 restaurants.
 * 'head'         is heading text for the top 3 restaurants.
 ******************************************************************************/

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
  const router = useRouter();

  useEffect(() => {
    if (props.restaurants) {
      if (props.restaurants.length > 0) {
        setRestaurantTrend(props.restaurants);
        setCountTrend(props.restaurants.length);
      }
    }
  }, [props]);

  const goToDetail = (index) => {
    const resID = restaurantTrend[index].data[0]._id;
    router.push(`/restaurant/${resID}`);
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
