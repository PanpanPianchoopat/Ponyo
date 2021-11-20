import React from "react";
import {
  CategoryContainer,
  TypeContainer,
  TypeCircle,
  TypeName,
  TypeImage,
} from "./styled";

const Category = (props) => {
  return (
    <>
      <CategoryContainer>
        <TypeContainer>
          <TypeCircle
            onClick={() => {
              props.setSelected("Casual Dining");
            }}
          >
            <TypeImage src="/assets/Category/dining.png" preview={false} />
          </TypeCircle>
          <TypeName>Casual Dining</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle
            onClick={() => {
              props.setSelected("Food Trucks");
            }}
          >
            <TypeImage src="/assets/Category/food-truck.png" preview={false} />
          </TypeCircle>
          <TypeName>Food Trucks</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle
            onClick={() => {
              props.setSelected("Fast Food");
            }}
          >
            <TypeImage src="/assets/Category/fast-food.png" preview={false} />
          </TypeCircle>
          <TypeName>Fast Food</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle
            onClick={() => {
              props.setSelected("Café");
            }}
          >
            <TypeImage src="/assets/Category/cafe.png" preview={false} />
          </TypeCircle>
          <TypeName>Café</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle
            onClick={() => {
              props.setSelected("Family Style");
            }}
          >
            <TypeImage src="/assets/Category/family.png" preview={false} />
          </TypeCircle>
          <TypeName>Family Style</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle
            onClick={() => {
              props.setSelected("Pub");
            }}
          >
            <TypeImage src="/assets/Category/pub.png" preview={false} />
          </TypeCircle>
          <TypeName>Pub</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle
            onClick={() => {
              props.setSelected("Buffet");
            }}
          >
            <TypeImage src="/assets/Category/buffet.png" preview={false} />
          </TypeCircle>
          <TypeName>Buffet</TypeName>
        </TypeContainer>
      </CategoryContainer>
    </>
  );
};

export default Category;
