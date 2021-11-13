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
            <TypeImage
              src="/assets/Category/dining.png"
              width={60}
              height={60}
              preview={false}
            />
          </TypeCircle>
          <TypeName>Casual dining</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage
              src="/assets/Category/food-truck.png"
              width={50}
              height={50}
              preview={false}
            />
          </TypeCircle>
          <TypeName>Food trucks</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage
              src="/assets/Category/fast-food.png"
              width={50}
              height={50}
              preview={false}
            />
          </TypeCircle>
          <TypeName>Fast food</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage
              src="/assets/Category/cafe.png"
              width={50}
              height={50}
              preview={false}
            />
          </TypeCircle>
          <TypeName>Café</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage
              src="/assets/Category/family.png"
              width={50}
              height={50}
              preview={false}
            />
          </TypeCircle>
          <TypeName>Family style</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage
              src="/assets/Category/pub.png"
              width={50}
              height={50}
              preview={false}
            />
          </TypeCircle>
          <TypeName>Pub</TypeName>
        </TypeContainer>
        <TypeContainer>
          <TypeCircle>
            <TypeImage
              src="/assets/Category/buffet.png"
              width={50}
              height={50}
              preview={false}
            />
          </TypeCircle>
          <TypeName>Buffet</TypeName>
        </TypeContainer>
      </CategoryContainer>
    </>
  );
};

export default Category;
