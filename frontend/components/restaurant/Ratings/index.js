import React, { useState, useEffect } from "react";
import { Progress } from "antd";
import COLORS from "../../../public/constant/colors";
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
  const [rates, setRate] = useState(null);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    setRate(props.rates);
    if (props.rates != null) {
      const totalStar = getSum(props.rates);
      setTotal(totalStar);
    }
  }, [props]);

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
                      strokeColor={COLORS.PRIMARY_BLUE}
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
