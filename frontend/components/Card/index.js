/*******************************************************************************
 * Card component - restaurant card
 * 'detail'     is restaurant's detail to be displayed on the card consisted
 *              of
 * 'showRank'   is boolean value to determine whether to show ranking number on
 *              top of the card or not.
 * 'rank'       is integer determining ranking number of the restaurant.
 * 'size'       is size of the card. If this field is set to 'large'. The card
 *              would be bigger. Otherwise, it uses the default card styles.
 ******************************************************************************/

import React, { useState, useEffect } from "react";
import { MAX_NAME_LEN, MAX_DES_LEN, MAX_LOCATION_LEN } from "./constant";
import RestaurantAPI from "../../pages/api/restaurantAPI";
import ReviewAPI from "../../pages/api/reviewAPI";
import { useRouter } from "next/router";
import {
  RestaurantCard,
  IconWrapper,
  Ranking,
  Location,
  RestaurantName,
  PriceRange,
  Description,
  Rating,
  CoverPhoto,
  CoverContainer,
  DetailContainer,
  LeftSection,
  RightSection,
  Star,
  Status,
  PinIcon,
} from "./styled";

const RestCard = ({ ...props }) => {
  const [resName, setResName] = useState(null);
  const [description, setDescription] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState(null);
  const [resStatus, setResStatus] = useState(null);
  const [resPicture, setResPicture] = useState(null);
  const router = useRouter();
  const IMAGE_POSITION = 1; // index of image

  /* Set new values to restaurant's detail variables if there is any changes on
  the detail prop */
  useEffect(() => {
    setResName(props.detail.name);
    setDescription(props.detail.description);
    setMinPrice(props.detail.priceRange.min);
    setMaxPrice(props.detail.priceRange.max);
    setLocation(props.detail.location.address);
    getRestaurantStatus(props.detail._id);
    // set restaurant picture to the second image in the array
    setResPicture(props.detail.image[IMAGE_POSITION]);
    getAvgRate(props.detail._id);
  }, [props.detail]);

  const getRestaurantStatus = (resID) => {
    RestaurantAPI.getRestaurantStatus(resID)
      .then((response) => {
        setResStatus(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAvgRate = (resID) => {
    ReviewAPI.calReviewRate(resID)
      .then((response) => {
        setRating(response.data[0].avgStar);
      })
      .catch((e) => {
        setRating(0);
      });
  };

  const goToDetail = () => {
    router.push(`/restaurant/${props.detail._id}`);
  };

  return (
    <RestaurantCard
      onClick={() => goToDetail()}
      size={props.size}
      headStyle={{ display: props.showRank ? "flex" : "none" }}
      bordered={false}
      title={
        <Ranking showRank={props.showRank}>{props.rank && props.rank}</Ranking>
      }
      cover={
        <CoverContainer customSize={props.size}>
          <IconWrapper>
            {props.detail ? (
              <Status status={resStatus}>{resStatus ? "OPEN" : "CLOSE"}</Status>
            ) : null}
          </IconWrapper>
          <CoverPhoto src={resPicture} />
        </CoverContainer>
      }
      style={{ margin: props.showRank ? "0 0.5vw" : "10px 0.5vw" }}
    >
      <DetailContainer size={props.size}>
        <LeftSection>
          <RestaurantName>
            {resName
              ? resName.length > MAX_NAME_LEN
                ? `${resName.substring(0, MAX_NAME_LEN)}...`
                : resName
              : null}
          </RestaurantName>
          <Description>
            {description
              ? description.length > MAX_DES_LEN
                ? `${description.substring(0, MAX_DES_LEN)}...`
                : description
              : null}

            {props.detail ? <p>({props.detail.type})</p> : null}
          </Description>
        </LeftSection>
        <RightSection>
          <PriceRange>
            ฿{minPrice} - {maxPrice}
          </PriceRange>
          {rating > 0 && (
            <Rating>
              <Star />
              {rating}
            </Rating>
          )}
        </RightSection>
      </DetailContainer>

      {location ? (
        <Location>
          <PinIcon />
          {location.length > MAX_LOCATION_LEN
            ? `${location.substring(0, MAX_LOCATION_LEN)}...`
            : location}
        </Location>
      ) : null}
    </RestaurantCard>
  );
};

export default RestCard;
