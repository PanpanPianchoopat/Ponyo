import React, { useState, useEffect } from "react";
import COLORS from "../../public/constant/colors";
import Button from "../components/Button";
import BestRate from "../components/BestRate";
import { TOP_3 } from "../components/BestRate/constant";
import Card from "../components/Card";
import { SAMPLE_DATA } from "../components/Card/constant";
import { BackTop } from "antd";
import Category from "./components/Category";
import {
  STATUS_OPTION,
  FILTER_OPTION,
  PRICE_OPTION,
  CUISINE_OPTION,
} from "./constant";
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
  const [status, setStatus] = useState("ALL");
  const [getRestaurants, setRestaurants] = useState(null);

  const [searchValue, setSearchValue] = useState({
    filter: "Name",
    input: "null",
    price: "0",
    cuisine: "Cuisine",
  });

  const onFinish = () => {
    console.log(searchValue);
  }

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
        <HeadSection>
          <NameImage src="/assets/ponyoName.svg" preview={false} />
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
                {FILTER_OPTION.map((type) => {
                  return <Option value={type}>{type}</Option>;
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
                  return <Option value={index.toString()}>{type}</Option>;
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
                {CUISINE_OPTION.map((type) => {
                  return <Option value={type}>{type}</Option>;
                })}
              </Selecter>
              <StyleButton onClick={onFinish}>SEARCH</StyleButton>
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
              options={STATUS_OPTION}
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
