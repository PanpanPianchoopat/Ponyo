import React, { useState, useEffect } from "react";
import BestRate from "../components/BestRate";
import { TOP_3 } from "../components/BestRate/constant";
import { BackTop } from "antd";
import { Header, Type } from "./styled";
import jwt from "jsonwebtoken";

const Trending = () => {
  const [isGuest, setIsGuest] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setIsGuest(false);
    } else {
      setIsGuest(true);
    }
  }, []);

  return (
    <>
      {!isGuest ? (
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
      ) : (
        <p>Guest</p>
      )}
    </>
  );
};

export default Trending;
