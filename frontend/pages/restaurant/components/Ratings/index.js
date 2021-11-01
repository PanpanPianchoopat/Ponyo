import React from "react";
import {
  RatingContainer,
  RestaurantRate,
  SectionHeader,
  EachRate,
  NumContainer,
  Count,
} from "./styled";
import { RATINGS } from "./constant";
import { Progress } from "antd";
import colors from "../../../../public/constant/colors";

function getSum(values) {
  let sum = 0;
  for (var i = 0; i < 5; i++) {
    sum = sum + values[i];
  }
  return sum;
}

const Ratings = () => {
  const total = getSum(RATINGS);
  return (
    <RatingContainer>
      <SectionHeader>Ratings</SectionHeader>
      {RATINGS.map((num, index) => (
        <EachRate key={index}>
          <RestaurantRate defaultValue={5 - index} disabled />
          <NumContainer>
            <Progress
              percent={(num / total) * 100}
              showInfo={false}
              strokeWidth={4}
              strokeColor={colors.PRIMARY_BLUE}
            />
            <Count>{num}</Count>
          </NumContainer>
        </EachRate>
      ))}
    </RatingContainer>
  );
};

export default Ratings;
