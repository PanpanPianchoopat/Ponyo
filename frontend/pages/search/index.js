import React from "react";
import COLORS from "../../public/constant/colors";
import {
  HeadSection,
  Name,
  SearchBar,
  Search,
  Selecter,
  StyleButton,
} from "./styled";

const { Option } = Selecter;

const SearchRestaurant = () => {
  return (
    <>
      <HeadSection>
        <Name>PONYO</Name>
        <SearchBar>
          <Search.Group compact>
            <Selecter
              bordered={false}
              size="large"
              defaultValue="name"
              dropdownStyle={{
                backgroundColor: COLORS.PRIMARY_LIGHT,
                textAlign: "center",
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
                textAlign: "center",
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
                textAlign: "center",
              }}
            >
              <Option value="cusine">Cuisine</Option>
              <Option value="option2">Option2</Option>
              <Option value="option3">Option3</Option>
            </Selecter>
            <StyleButton variant="red" size="small" outline="round">SEARCH</StyleButton>
          </Search.Group>
        </SearchBar>
      </HeadSection>
    </>
  );
};

export default SearchRestaurant;
