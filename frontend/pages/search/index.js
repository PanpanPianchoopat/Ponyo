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
  const [allRestaurants, setAllRestaurants] = useState(null);
  const [getRestaurants, setRestaurants] = useState(null);

  useEffect(() => {
    getAllRestaurant();
  }, []);

  useEffect(() => {
    if(status != null){
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
        <HeadSection>
          {/* <Name>PONYO</Name> */}
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
              >
                <Option value="name">Name</Option>
                <Option value="address">address</Option>
              </Selecter>
              <Search bordered={false} size="large" placeholder="Search" />
              <Selecter
                bordered={false}
                size="large"
                defaultValue="price"
                dropdownStyle={{
                  backgroundColor: COLORS.PRIMARY_LIGHT,
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
                defaultValue="cusine"
                dropdownStyle={{
                  backgroundColor: COLORS.PRIMARY_LIGHT,
                }}
              >
                <Option value="">Cuisine</Option>
                <Option value="Causual dining">Causual dining</Option>
                <Option value="Food trucks">Food trucks</Option>
                <Option value="Fast-food">Fast-food</Option>
                <Option value="Café">Café</Option>
                <Option value="Family-style">Family-style</Option>
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
