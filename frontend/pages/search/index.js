import React, { useState, useEffect } from "react";
import COLORS from "../../public/constant/colors";
import Button from "../components/Button";
import BestRate from "../components/BestRate";
import { TOP_3 } from "../components/BestRate/constant";
import Card from "../components/Card";
import { SAMPLE_DATA } from "../components/Card/constant";
import { BackTop } from "antd";
import Category from "./components/Category";
import RestaurantAPI from "../api/restaurantAPI";
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
  BestRateContainer,
} from "./styled";

const SearchRestaurant = () => {
  const { Option } = Selecter;
  const statusOption = ["ALL", "OPEN", "CLOSE"];
  const [status, setStatus] = useState("ALL");
  const [getRestaurants, setRestaurants] = useState(null);

  const [searchValue, setSearchValue] = useState({
    nameAd: "name",
    input: "null",
    price: "price",
    cuisine: "cuisine",
  });

  useEffect(() => {
    getAllRestaurant();
  }, []);

  useEffect(() => {
    if (status != null) {
      getRestaurant();
    }
  }, [status]);

  useEffect(() => {
    console.log("getRestaurants", getRestaurants);
  }, [getRestaurants]);

  const changeStatus = (e) => {
    setStatus(e.target.value);
  };

  const getRestaurant = () => {
    RestaurantAPI.getRestaurant("name", "V", 0, "Pub", "OPEN")
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllRestaurant = () => {
    RestaurantAPI.getAllRestaurants()
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
        #Debug {JSON.stringify(searchValue.cuisine)}
        <HeadSection>
          <NameImage src="/assets/ponyoName.svg" preview={false} />
          <SearchBar>
            <Search.Group compact>
              <Selecter
                bordered={false}
                size="large"
                defaultValue="name"
                dropdownStyle={{
                  backgroundColor: COLORS.PRIMARY_LIGHT,
                }}
                onChange={(e) => {
                  setSearchValue({ ...searchValue, nameAd: e });
                }}
              >
                <Option value="name">Name</Option>
                <Option value="address">address</Option>
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
                defaultValue="0"
                dropdownStyle={{
                  backgroundColor: COLORS.PRIMARY_LIGHT,
                }}
                onChange={(e) => {
                  setSearchValue({ ...searchValue, price: e });
                }}
              >
                <Option value="0">Price</Option>
                <Option value="1">0-500</Option>
                <Option value="2">500-1,000</Option>
                <Option value="3">1,000-5,000</Option>
                <Option value="4">5,000-10,000</Option>
              </Selecter>
              <Selecter
                bordered={false}
                size="large"
                defaultValue="null"
                dropdownStyle={{
                  backgroundColor: COLORS.PRIMARY_LIGHT,
                }}
                onChange={(e) => {
                  setSearchValue({ ...searchValue, cuisine: e });
                }}
              >
                <Option value="null">Cuisine</Option>
                <Option value="Casual Dining">Casual Dining</Option>
                <Option value="Food Trucks">Food Trucks</Option>
                <Option value="Fast-food">Fast-food</Option>
                <Option value="Café">Café</Option>
                <Option value="Family Style">Family Style</Option>
                <Option value="Pub">Pub</Option>
                <Option value="Buffet">Buffet</Option>
              </Selecter>
              <StyleButton>SEARCH</StyleButton>
            </Search.Group>
          </SearchBar>
        </HeadSection>
        <Category />
        <ContentContainer>
          <ContentName>
            Explore our restaurants
            <Underline />
          </ContentName>
          <StatusBox>
            <Status.Group
              options={statusOption}
              onChange={changeStatus}
              value={status}
            />
          </StatusBox>
          <CardContainer>
            {getRestaurants
              ? getRestaurants.map((detail, key) => (
                  <Card detail={detail} liked={true} saved={true} key={key} />
                ))
              : null}
          </CardContainer>
          <Button variant="yellow">Explore more</Button>
        </ContentContainer>
        <BestRateContainer>
          <BestRate
            head="Best rated restaurants"
            theme="dark"
            restaurants={TOP_3}
          />
          <Button variant="yellow">Explore more</Button>
        </BestRateContainer>
      </Container>
      <BackTop />
    </>
  );
};

export default SearchRestaurant;
