/*******************************************************************************
 * Tranding page - Show treding restaurant.
 * This page will show restaurants that are in trending.
 * User need to login to see this page.
 ******************************************************************************/

import React, { useState, useEffect } from "react";
import BestRate from "../../components/BestRate";
import { BackTop, Spin } from "antd";
import { Header, Loading, SmileIcon } from "./styled";
import RestaurantAPI from "../api/restaurantAPI";
import jwt from "jsonwebtoken";
import HideTrend from "./components/HideTrend";

const Trending = () => {
  const [bestTrend, setBestTrend] = useState(null);
  const [casualTrend, setCasual] = useState([]);
  const [foodTrucksTrend, setFoodTrucks] = useState([]);
  const [fastFoodTrend, setFastFood] = useState([]);
  const [cafeTrend, setCafe] = useState([]);
  const [familyStyleTrend, setFamilyStyle] = useState([]);
  const [pubTrend, setPub] = useState([]);
  const [buffetTrend, setBuffet] = useState([]);

  const [isGuest, setIsGuest] = useState(true);

  /* This useEffect checks that the user is logged in or not */
  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setIsGuest(false);
    } else {
      setIsGuest(true);
    }
  }, []);

  /* This useEffect will call the function getTrending 
   * in the first time of this page 
   */
  useEffect(() => {
    getTrending();
  }, []);

  /* This function will get the restaurant that 
   * are in trending from database.
   */
  const getTrending = () => {
    RestaurantAPI.getBestTrending()
      .then((response) => {
        setBestTrend(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
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
      <HideTrend visible={isGuest} />
      <Header>
        {bestTrend ? (
          <BestRate
            head="Best rated restaurants"
            theme="dark"
            restaurants={bestTrend}
          />
        ) : (
          <Loading>
            <Spin indicator={<SmileIcon spin />} />
            loading
          </Loading>
        )}
      </Header>
      <div>
        <BestRate head="Casual dining" restaurants={casualTrend} />
      </div>
      <div>
        <BestRate head="Food trucks" restaurants={foodTrucksTrend} />
      </div>
      <div>
        <BestRate head="Fast food" restaurants={fastFoodTrend} />
      </div>
      <div>
        <BestRate head="Café" restaurants={cafeTrend} />
      </div>
      <div>
        <BestRate head="Family style" restaurants={familyStyleTrend} />
      </div>
      <div>
        <BestRate head="Pub" restaurants={pubTrend} />
      </div>
      <div>
        <BestRate head="Buffet" restaurants={buffetTrend} />
      </div>
      <BackTop />
    </>
  );
};

export default Trending;
