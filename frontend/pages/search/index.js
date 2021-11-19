import React, { useState } from "react";
import COLORS from "../../public/constant/colors";
import Button from "../components/Button";
import BestRate from "../components/BestRate";
import { TOP_3 } from "../components/BestRate/constant";
import Card from "../components/Card";
import { SAMPLE_DATA } from "../components/Card/constant";
import { BackTop } from "antd";
import Category from "./components/Category";
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

  const changeStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <Container>
        <HeadSection>
          {/* <Name>PONYO</Name> */}
          <NameImage
            src="/assets/ponyoName.svg"
            preview={false}
          />
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
                <Option value="option2">Option2</Option>
                <Option value="option3">Option3</Option>
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
                <Option value="price">Price</Option>
                <Option value="option2">Option2</Option>
                <Option value="option3">Option3</Option>
              </Selecter>
              <Selecter
                bordered={false}
                size="large"
                defaultValue="cusine"
                dropdownStyle={{
                  backgroundColor: COLORS.PRIMARY_LIGHT,
                }}
              >
                <Option value="cusine">Cuisine</Option>
                <Option value="option2">Option2</Option>
                <Option value="option3">Option3</Option>
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
            {SAMPLE_DATA.map((detail, key) => (
              <Card detail={detail} liked={true} saved={true} key={key} />
            ))}
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
