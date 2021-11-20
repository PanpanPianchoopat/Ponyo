import React, { useState, useEffect } from "react";
import BestRate from "../components/BestRate";
import { TOP_3 } from "../components/BestRate/constant";
import { BackTop } from "antd";
import { Header, Type } from "./styled";
import RestaurantAPI from "../api/restaurantAPI";

const Trending = () => {
  const [casualTrend, setCasual] = useState(null);
  const [foodTrucksTrend, setFoodTrucks] = useState(null);
  const [fastFoodTrend, setFastFood] = useState(null);
  const [cafeTrend, setCafe] = useState(null);
  const [familyStyleTrend, setFamilyStyle] = useState(null);
  const [pubTrend, setPub] = useState(null);
  const [buffetTrend, setBuffet] = useState(null);

  useEffect(() => {
    getTrending();
  }, []);

  // useEffect(() => {
  //   console.log("casual", cafeTrend);
  // }, [cafeTrend]);

  const getTrending = () => {
    RestaurantAPI.getTrending("Casual Dining")
      .then((response) => {
        setCasual(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    RestaurantAPI.getTrending("Food Trucks")
      .then((response) => {
        setFoodTrucks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    RestaurantAPI.getTrending("Fast Food")
      .then((response) => {
        setFastFood(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    RestaurantAPI.getTrending("Café")
      .then((response) => {
        setCafe(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    RestaurantAPI.getTrending("Family Style")
      .then((response) => {
        setFamilyStyle(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    RestaurantAPI.getTrending("Pub")
      .then((response) => {
        setPub(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    RestaurantAPI.getTrending("Buffet")
      .then((response) => {
        setBuffet(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
        <BestRate
          head="Casual dining"
          restaurants={casualTrend ? casualTrend : null}
        />
      </Type>
      <Type>
        <BestRate
          head="Food trucks"
          restaurants={foodTrucksTrend ? foodTrucksTrend : null}
        />
      </Type>
      <Type>
        <BestRate
          head="Fast food"
          restaurants={fastFoodTrend ? fastFoodTrend : null}
        />
      </Type>
      <Type>
        <BestRate head="Café" restaurants={cafeTrend ? cafeTrend : null} />
      </Type>
      <Type>
        <BestRate
          head="Family style"
          restaurants={familyStyleTrend ? familyStyleTrend : null}
        />
      </Type>
      <Type>
        <BestRate head="Pub" restaurants={pubTrend ? pubTrend : null} />
      </Type>
      <Type>
        <BestRate
          head="Buffet"
          restaurants={buffetTrend ? buffetTrend : null}
        />
      </Type>
      <BackTop />
    </>
  );
};

export default Trending;
