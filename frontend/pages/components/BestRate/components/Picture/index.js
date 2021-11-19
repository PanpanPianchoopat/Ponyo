import React, { useState } from "react";
import {
  Description,
  RestaurantName,
  RestaurantDescription,
  CoverPic,
  Rating,
  StarIcon,
} from "./styled";

const Picture = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const isTop = props.isTop;

  if (props != null) {
    console.log("picture", props);
  }

  return (
    <>
      <Description isHovered={isHovered}>
        {/* <RestaurantName isTop={isTop}>{props.info.name}</RestaurantName>
        <RestaurantDescription isTop={isTop}>
          {props.info.description}
        </RestaurantDescription> */}
      </Description>
      {/* <CoverPic
        src={props.info.image[1]}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <Rating>
        <StarIcon />
        {props.info.rate}
      </Rating> */}
    </>
  );
};

export default Picture;
