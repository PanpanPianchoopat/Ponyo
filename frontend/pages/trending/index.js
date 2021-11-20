import React from "react";
import BestRate from "../components/BestRate";
import { TOP_3 } from "../components/BestRate/constant";
import { BackTop } from "antd";
import { Header, Type } from "./styled";

const Trending = () => {
  return (
    <>
      <Header>
        <BestRate
          head="Best rated restaurants"
          theme="dark"
          restaurants={TOP_3}
        />
      </Header>
      <Type>
        <BestRate head="Casual dining" restaurants={TOP_3} />
      </Type>
      <Type>
        <BestRate head="Food trucks" restaurants={TOP_3} />
      </Type>
      <Type>
        <BestRate head="Fast food" restaurants={TOP_3} />
      </Type>
      <Type>
        <BestRate head="Café" restaurants={TOP_3} />
      </Type>
      <Type>
        <BestRate head="Family style" restaurants={TOP_3} />
      </Type>
      <Type>
        <BestRate head="Pub" restaurants={TOP_3} />
      </Type>
      <Type>
        <BestRate head="Buffet" restaurants={TOP_3} />
      </Type>
      <BackTop />
    </>
  );
};

export default Trending;
