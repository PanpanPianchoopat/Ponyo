import React, { useState } from "react";
import {
  SectionContainer,
  SectionHeader,
  Underline,
  ReviewFilters,
  FilterButton,
  Number,
} from "./styled";
import { FILTER, COUNT } from "./constant";
import { Divider, Rate } from "antd";

const Reviews = () => {
  const [filter, setFilter] = useState(0);
  return (
    <SectionContainer>
      <SectionHeader>Reviews</SectionHeader>
      <Underline />
      <ReviewFilters>
        {FILTER.map((type, index) => (
          <FilterButton
            key={index}
            isSelected={filter == index}
            onClick={() => setFilter(index)}
          >
            {typeof type === "string" ? (
              type
            ) : (
              <Rate disabled defaultValue={type} style={{ fontSize: "12px" }} />
            )}
            <Number>({COUNT[index]})</Number>
          </FilterButton>
        ))}
      </ReviewFilters>
      <Divider />
    </SectionContainer>
  );
};

export default Reviews;
