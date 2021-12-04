/*******************************************************************************
 * Picture component - picture display from trending component.
 * 'info'   is restaurant information.
 * 'isTop'  is whether the picture is that of top restaurant in trend or not.
 ******************************************************************************/

import React, { useState, useEffect } from "react";
import ReviewAPI from "../../../../pages/api/reviewAPI";
import {
  Description,
  RestaurantName,
  RestaurantDescription,
  CoverPic,
  Rating,
  StarIcon,
  EmptyContainer,
  EmptyPic,
} from "./styled";
import { DESCRIPTION_LIMIT } from "./constant";

const Picture = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [trendInfo, setTrendInfo] = useState(props.info);
  const [rate, setRate] = useState(0);
  const isTop = props.isTop;

  useEffect(() => {
    setTrendInfo(props.info);
  }, [props.info]);

  useEffect(() => {
    if (trendInfo != null) {
      getRestaurantRate();
    }
  }, [trendInfo]);

  /* This function query restaurant rating from the database */
  const getRestaurantRate = () => {
    ReviewAPI.calReviewRate(trendInfo._id)
      .then((response) => {
        setRate(response.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return props.info ? (
    <>
      <CoverPic
        src={trendInfo ? trendInfo.image[1] : null}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      <Description isHovered={isHovered}>
        <RestaurantName isTop={isTop}>
          {trendInfo ? trendInfo.name : null}
        </RestaurantName>
        <RestaurantDescription isTop={isTop}>
          {trendInfo
            ? trendInfo.description.length > DESCRIPTION_LIMIT
              ? `${trendInfo.description.substring(0, DESCRIPTION_LIMIT)}...`
              : trendInfo.description
            : null}
        </RestaurantDescription>
      </Description>
      <Rating>
        <StarIcon />
        {rate ? rate.avgStar : 0}
      </Rating>
    </>
  ) : (
    <EmptyContainer>
      <EmptyPic src="/assets/redBowl.svg" />
    </EmptyContainer>
  );
};

export default Picture;
