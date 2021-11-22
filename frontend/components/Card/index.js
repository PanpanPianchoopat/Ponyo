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
  const resRank = props ? props.rank + 1 : 0;

  useEffect(() => {
    setResName(props.detail.name);
    setDescription(props.detail.description);
    setMinPrice(props.detail.priceRange.min);
    setMaxPrice(props.detail.priceRange.max);
    setLocation(props.detail.location.address);
    getRestaurantStatus(props.detail._id);
    setResPicture(props.detail.image[1]);
    getAvgRate(props.detail._id);
  }, [props.detail]);

  const getRestaurantStatus = (res_id) => {
    RestaurantAPI.getRestaurantStatus(res_id)
      .then((response) => {
        setResStatus(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAvgRate = (res_id) => {
    ReviewAPI.calReviewRate(res_id)
      .then((response) => {
        setRating(response.data[0].avgStar);
      })
      .catch((e) => {
        setRating(0);
      });
  };

  const router = useRouter();
  const goToDetail = () => {
    router.push({ pathname: "/restaurant", query: { id: props.detail._id } });
  };

  return (
    <RestaurantCard
      onClick={() => goToDetail()}
      size={props.size}
      headStyle={{ display: props.showRank ? "flex" : "none" }}
      bordered={false}
      title={<Ranking showRank={props.showRank}>{resRank}</Ranking>}
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
