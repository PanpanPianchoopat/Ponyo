/*******************************************************************************
 * Search restaurant page - Show all restaurant.
 * This page will show all restaurant and user can search
 * and sort to find the restaurant.
 ******************************************************************************/

import React, { useState, useEffect } from "react";
import COLORS from "../../public/constant/colors";
import Button from "../../components/Button";
import BestRate from "../../components/BestRate";
import RestaurantAPI from "../api/restaurantAPI";
import Card from "../../components/Card";
import { BackTop, Spin } from "antd";
import Category from "./components/Category";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  STATUS_OPTION,
  FILTER_OPTION,
  PRICE_OPTION,
  CUISINE_OPTION,
} from "../../public/constant/search";
import {
  Container,
  HeadSection,
  NameImage,
  SearchBar,
  Search,
  Selecter,
  StyleButton,
  ContentName,
  Underline,
  ContentContainer,
  StatusBox,
  Status,
  CardContainer,
  Loading,
  SmileIcon,
  BestRateContainer,
  EmptyDisplayContainer,
  EmptyIcon,
  Warning,
  NotFoundText,
} from "./styled";

function SearchRestaurant({ restaurants }) {
  const { Option } = Selecter;
  const [trending, setTrending] = useState([]);
  const [status, setStatus] = useState("ALL");
  const [restaurant, setRestaurants] = useState(restaurants);
  const [checkSearch, setCheckSearch] = useState("search");

  const [searchValue, setSearchValue] = useState({
    filter: "name",
    input: "noInput",
    price: 0,
    cuisine: "Cuisine",
  });

  const [selectedCat, setSelectedCat] = useState("");

  const router = useRouter();

  /* This function will get best tranding from database */
  useEffect(() => {
    RestaurantAPI.getBestTrending()
      .then((response) => {
        setTrending(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  /* This function is called when the user searches
   * for a restaurant to call the function getRestaurant.
   */
  const onFinish = () => {
    setRestaurants(null);
    getRestaurant();
    setCheckSearch("search");
  };

  /* This useEffect will check the 'status' if the 'status' value was change
   * it will call the function getRestaurant.
   * 'status' is the status of restaurant.
   */
  useEffect(() => {
    if (status != null) {
      if (checkSearch == "search") {
        getRestaurant();
      } else {
        getRestaurantByType();
      }
    }
  }, [status]);

  /* This useEffect will check the 'selectedCat' if the 'selectedCat' value was change
   * it will call the function getRestaurantByType.
   * 'selectedCat' is the value of cursine type.
   */
  useEffect(() => {
    if (selectedCat != "") {
      getRestaurantByType();
      setCheckSearch("type");
    }
  }, [selectedCat]);

  /* This function will change the status value */
  const changeStatus = (e) => {
    setStatus(e.target.value);
  };

  /* This function will get restaurant in database
   * to store in Restaurants variable
   */
  const getRestaurant = () => {
    setRestaurants(null);
    setSelectedCat("");
    if (searchValue.filter == "address") {
      searchValue.filter = "location.address";
    }
    if (searchValue.input == "") {
      searchValue.input = "noInput";
    }
    RestaurantAPI.getRestaurant(
      searchValue.filter,
      searchValue.input,
      searchValue.price,
      searchValue.cuisine,
      status
    )
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /* This function is called when the user select in
   * category bar or status radio to query the data from database.
   */
  const getRestaurantByType = () => {
    setRestaurants(null);
    RestaurantAPI.getRestaurant(
      searchValue.filter,
      "noInput",
      0,
      selectedCat,
      status
    )
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Container>
        <HeadSection>
          <NameImage src="/assets/ponyoName.svg" />
          <SearchBar>
            <Search.Group compact>
              <Selecter
                bordered={false}
                size="large"
                defaultValue="Name"
                dropdownStyle={{
                  backgroundColor: COLORS.PRIMARY_LIGHT,
                }}
                onChange={(e) => {
                  setSearchValue({ ...searchValue, filter: e });
                }}
              >
                {FILTER_OPTION.map((type, index) => {
                  return (
                    <Option value={type.toLowerCase()} key={index}>
                      {type}
                    </Option>
                  );
                })}
              </Selecter>
              <Search
                bordered={false}
                size="large"
                placeholder="Search"
                onChange={(e) => {
                  setSearchValue({ ...searchValue, input: e.target.value });
                }}
              />
              <Selecter
                bordered={false}
                size="large"
                defaultValue="Price"
                dropdownStyle={{
                  backgroundColor: COLORS.PRIMARY_LIGHT,
                }}
                onChange={(e) => {
                  setSearchValue({ ...searchValue, price: e });
                }}
              >
                {PRICE_OPTION.map((type, index) => {
                  return (
                    <Option value={index.toString()} key={index}>
                      {type}
                    </Option>
                  );
                })}
              </Selecter>
              <Selecter
                bordered={false}
                size="large"
                defaultValue="Cuisine"
                dropdownStyle={{
                  backgroundColor: COLORS.PRIMARY_LIGHT,
                }}
                onChange={(e) => {
                  setSearchValue({ ...searchValue, cuisine: e });
                }}
              >
                {CUISINE_OPTION.map((type, index) => {
                  return (
                    <Option value={type} key={index}>
                      {type}
                    </Option>
                  );
                })}
              </Selecter>
              <StyleButton onClick={onFinish}>SEARCH</StyleButton>
            </Search.Group>
          </SearchBar>
        </HeadSection>
        <Category setSelected={setSelectedCat} check={checkSearch} />
        <ContentContainer>
          <ContentName>
            Explore our restaurants
            <Underline />
          </ContentName>
          <StatusBox>
            <Status.Group
              options={STATUS_OPTION}
              onChange={changeStatus}
              value={status}
            />
          </StatusBox>
          <CardContainer>
            {restaurant ? (
              restaurant.length > 0 ? (
                restaurant.map((detail, key) => (
                  <Card detail={detail} key={key} />
                ))
              ) : (
                <EmptyDisplayContainer>
                  <EmptyIcon src="/assets/redBowl.svg" />
                  <Warning>Opps!!</Warning>
                  <NotFoundText>Sorry, No result found</NotFoundText>
                </EmptyDisplayContainer>
              )
            ) : (
              <Loading>
                <Spin indicator={<SmileIcon spin />} />
                loading
              </Loading>
            )}
          </CardContainer>
        </ContentContainer>
        <BestRateContainer>
          <BestRate
            head="Best rated restaurants"
            theme="dark"
            restaurants={trending && (trending.length > 0 ? trending : null)}
            isNotNull={trending ? true : false}
          />
          <Button variant="yellow" onClick={() => router.push("/trending")}>
            Explore more
          </Button>
        </BestRateContainer>
      </Container>
      <BackTop />
    </>
  );
}

/* This function queries all restaurants from the database and pass the result
 * to the SearchRestaurant function for display.
 */
export async function getStaticProps() {
  const res = await fetch(
    "https://ponyo-restaurant-review.herokuapp.com/restaurant/"
  );
  const restaurants = await res.json();
  return { props: { restaurants } };
}

export default SearchRestaurant;
