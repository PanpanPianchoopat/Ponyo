import React, { useState } from "react";
import {
  CategoryContainer,
  TypeContainer,
  TypeCircle,
  TypeName,
  TypeImage,
} from "./styled";

const Category = (props) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <CategoryContainer>
        <TypeContainer>
          <TypeCircle
            isActive={selected === "Casual Dining"}
            check={props.check}
            onClick={() => {
              setSelected("Casual Dining");
              props.setSelected("Casual Dining");
            }}
          >
            <TypeImage src="/assets/Category/dining.png" preview={false} />
          </TypeCircle>
          <TypeName>Casual Dining</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle
            isActive={selected === "Food Trucks"}
            check={props.check}
            onClick={() => {
              setSelected("Food Trucks");
              props.setSelected("Food Trucks");
            }}
          >
            <TypeImage src="/assets/Category/food-truck.png" preview={false} />
          </TypeCircle>
          <TypeName>Food Trucks</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle
            isActive={selected === "Fast Food"}
            check={props.check}
            onClick={() => {
              setSelected("Fast Food");
              props.setSelected("Fast Food");
            }}
          >
            <TypeImage src="/assets/Category/fast-food.png" preview={false} />
          </TypeCircle>
          <TypeName>Fast Food</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle
            isActive={selected === "Café"}
            check={props.check}
            onClick={() => {
              setSelected("Café");
              props.setSelected("Café");
            }}
          >
            <TypeImage src="/assets/Category/cafe.png" preview={false} />
          </TypeCircle>
          <TypeName>Café</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle
            isActive={selected === "Family Style"}
            check={props.check}
            onClick={() => {
              setSelected("Family Style");
              props.setSelected("Family Style");
            }}
          >
            <TypeImage src="/assets/Category/family.png" preview={false} />
          </TypeCircle>
          <TypeName>Family Style</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle
            isActive={selected === "Pub"}
            check={props.check}
            onClick={() => {
              setSelected("Pub");
              props.setSelected("Pub");
            }}
          >
            <TypeImage src="/assets/Category/pub.png" preview={false} />
          </TypeCircle>
          <TypeName>Pub</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle
            isActive={selected === "Buffet"}
            check={props.check}
            onClick={() => {
              setSelected("Buffet");
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
