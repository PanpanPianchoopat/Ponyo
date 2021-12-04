/*******************************************************************************
 * Ratings component - restaurant's ratings in detail.
 * 'rates' is array of restaurant's rating count for each star.
 ******************************************************************************/

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

const Ratings = (props) => {
  const [rates, setRates] = useState(null);
  const [total, setTotal] = useState([]);

  /* This function calculates total sum of ratings count.
   * 'rates' is array of restaurant's rating count for each star.
   * It returns count of total number of ratings.
   */
  function getSum(rates) {
    let sum = 0;
    for (var i = 0; i < 5; i++) {
      sum = sum + rates[i];
    }
    return sum;
  }

  useEffect(() => {
    setRates(props.rates);

    /* Get total number of rating count */
    if (props.rates != null) {
      const totalStar = getSum(props.rates);
      setTotal(totalStar);
    }
  }, [props]);

  return (
    <>
      <RatingContainer>
        <SectionHeader>Ratings</SectionHeader>

        {rates &&
          rates.map((num, index) => {
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
          })}
      </RatingContainer>
    </>
  );
};

export default Ratings;
