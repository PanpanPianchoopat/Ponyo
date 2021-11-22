import React, { useState, useEffect } from "react";
import {
  Description,
  RestaurantName,
  RestaurantDescription,
  CoverPic,
  Rating,
  StarIcon,
} from "./styled";
import ReviewAPI from "../../../../pages/api/reviewAPI";

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

  const getRestaurantRate = () => {
    ReviewAPI.calReviewRate(trendInfo._id)
      .then((response) => {
        setRate(response.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Description isHovered={isHovered}>
        <RestaurantName isTop={isTop}>
          {trendInfo ? trendInfo.name : null}
        </RestaurantName>
        <RestaurantDescription isTop={isTop}>
          {trendInfo ? trendInfo.description : null}
        </RestaurantDescription>
      </Description>
      <CoverPic
        src={trendInfo ? trendInfo.image[1] : null}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <Rating>
        <StarIcon />
        {rate ? rate.avgStar : 0}
      </Rating>
    </>
  );
};

export default Picture;
