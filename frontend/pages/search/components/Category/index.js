import React from "react";
import COLORS from "../../../../public/constant/colors";
import {
  CategoryContainer,
  TypeContainer,
  TypeCircle,
  TypeName,
  TypeImage,
} from "./styled";

const Category = () => {
  return (
    <>
      <CategoryContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage src="/assets/Category/dining.png" preview={false} />
          </TypeCircle>
          <TypeName>Casual dining</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage src="/assets/Category/food-truck.png" preview={false} />
          </TypeCircle>
          <TypeName>Food trucks</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage src="/assets/Category/fast-food.png" preview={false} />
          </TypeCircle>
          <TypeName>Fast food</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage src="/assets/Category/cafe.png" preview={false} />
          </TypeCircle>
          <TypeName>Café</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage src="/assets/Category/family.png" preview={false} />
          </TypeCircle>
          <TypeName>Family style</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage src="/assets/Category/pub.png" preview={false} />
          </TypeCircle>
          <TypeName>Pub</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage src="/assets/Category/buffet.png" preview={false} />
          </TypeCircle>
          <TypeName>Buffet</TypeName>
        </TypeContainer>
      </CategoryContainer>
    </>
  );
};

export default Category;
