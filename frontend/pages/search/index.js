import React, { useState, useEffect } from "react";
import COLORS from "../../public/constant/colors";
import Button from "../components/Button";
import BestRate from "../components/BestRate";

import Card from "../components/Card";
import { BackTop, Spin } from "antd";

import Category from "./components/Category";
import { useRouter } from "next/router";
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
  SmileIcon,
  BestRateContainer,
} from "./styled";

const SearchRestaurant = () => {
  const { Option } = Selecter;
  const [status, setStatus] = useState("ALL");
  const [restaurant, setRestaurants] = useState(null);

  const [searchValue, setSearchValue] = useState({
    filter: "name",
    input: "noInput",
    price: 0,
    cuisine: "Cuisine",
  });

  const [selectedCat, setSelectedCat] = useState("");
  const [bestTrend, setBestTrend] = useState([]);
  const [isBest, setIsBest] = useState(false);

  const router = useRouter();

  const onFinish = () => {
    getRestaurant();
  };

  useEffect(() => {
    getAllRestaurant();
  }, []);

  useEffect(() => {
    if (status != null) {
      getRestaurant();
    }
  }, [status]);

  useEffect(() => {
    if (selectedCat != "") {
      getRestaurantByType();
    }
  }, [selectedCat]);

  useEffect(() => {
    if (bestTrend != null && bestTrend.length != 0) {
      setIsBest(true);
    }
  }, [bestTrend]);

  const changeStatus = (e) => {
    setStatus(e.target.value);
  };

  const getRestaurant = () => {
    if (searchValue.filter == "address") {
      searchValue.filter = "location.address";
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

  const getAllRestaurant = () => {
    RestaurantAPI.getAllRestaurants()
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    RestaurantAPI.getBestTrending()
      .then((response) => {
        setBestTrend(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getRestaurantByType = () => {
    RestaurantAPI.getRestaurantByType(selectedCat)
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
        <Category setSelected={setSelectedCat} />
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
              restaurant.map((detail, key) => (
                <Card detail={detail} liked={true} saved={true} key={key} />
              ))
            ) : (
              <p>
                <Spin indicator={<SmileIcon spin />} />
                loading
              </p>
            )}
          </CardContainer>
        </ContentContainer>
        <BestRateContainer>
          <BestRate
            head="Best rated restaurants"
            theme="dark"
            restaurants={bestTrend.length != 0 ? bestTrend : null}
            isNotNull={isBest}
          />
          <Button variant="yellow" onClick={() => router.push("/trending")}>
            Explore more
          </Button>
        </BestRateContainer>
      </Container>
      <BackTop />
    </>
  );
};

export default SearchRestaurant;
