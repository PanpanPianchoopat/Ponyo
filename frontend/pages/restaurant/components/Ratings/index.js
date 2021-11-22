import React from "react";
import { Progress } from "antd";
import colors from "../../../../public/constant/colors";
import {
  RatingContainer,
  RestaurantRate,
  SectionHeader,
  EachRate,
  NumContainer,
  Count,
} from "./styled";

function getSum(values) {
  let sum = 0;
  for (var i = 0; i < 5; i++) {
    sum = sum + values[i];
  }
  return sum;
}

const Ratings = (props) => {
  const rates = props.rates;
  const total = getSum(rates ? rates : []);
  return (
    <>
      <RatingContainer>
        <SectionHeader>Ratings</SectionHeader>

        {rates
          ? rates.map((num, index) => {
              return (
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
              );
            })
          : null}
      </RatingContainer>
    </>
  );
};

export default Ratings;
