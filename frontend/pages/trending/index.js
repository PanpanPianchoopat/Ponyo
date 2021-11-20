import React, { useState, useEffect } from "react";
import BestRate from "../components/BestRate";
import { TOP_3 } from "../components/BestRate/constant";
import { BackTop } from "antd";
import { Header, Type } from "./styled";
import RestaurantAPI from "../api/restaurantAPI";
import jwt from "jsonwebtoken";
import HideTrend from "./HideTrend";

const Trending = () => {
  const [bestTrend, setBestTrend] = useState([]);
  const [casualTrend, setCasual] = useState([]);
  const [foodTrucksTrend, setFoodTrucks] = useState([]);
  const [fastFoodTrend, setFastFood] = useState([]);
  const [cafeTrend, setCafe] = useState([]);
  const [familyStyleTrend, setFamilyStyle] = useState([]);
  const [pubTrend, setPub] = useState([]);
  const [buffetTrend, setBuffet] = useState([]);

  const [isBest, setIsBest] = useState(false);
  const [isCasual, setIsCasual] = useState(false);
  const [isFoodTruck, setIsfoodTruck] = useState(false);
  const [isFastFood, setIsFastFood] = useState(false);
  const [isCafe, setIsCafe] = useState(false);
  const [isFamily, setIsFamily] = useState(false);
  const [isPub, setisPub] = useState(false);
  const [isBuffet, setIsBuffet] = useState(false);

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

  useEffect(() => {
    getTrending();
  }, []);

  useEffect(() => {
    if (bestTrend != null && bestTrend.length != 0) {
      setIsBest(true);
    }
    if (casualTrend != null && casualTrend.length != 0) {
      setIsCasual(true);
    }
    if (foodTrucksTrend != null && foodTrucksTrend.length != 0) {
      setIsfoodTruck(true);
    }
    if (fastFoodTrend != null && fastFoodTrend.length != 0) {
      setIsFastFood(true);
    }
    if (cafeTrend != null && cafeTrend.length != 0) {
      setIsCafe(true);
    }
    if (familyStyleTrend != null && familyStyleTrend.length != 0) {
      setIsFamily(true);
    }
    if (pubTrend != null && pubTrend.length != 0) {
      setisPub(true);
    }
    if (buffetTrend != null && buffetTrend.length != 0) {
      setIsBuffet(true);
    }
  }, [
    bestTrend,
    casualTrend,
    foodTrucksTrend,
    fastFoodTrend,
    cafeTrend,
    familyStyleTrend,
    pubTrend,
    buffetTrend,
  ]);

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
        <BestRate
          head="Best rated restaurants"
          theme="dark"
          restaurants={bestTrend.length != 0 ? bestTrend : null}
          isNotNull={isBest}
        />
      </Header>
      <Type>
        <BestRate
          head="Casual dining"
          restaurants={casualTrend.length != 0 ? casualTrend : null}
          isNotNull={isCasual}
        />
      </Type>
      <Type>
        <BestRate
          head="Food trucks"
          restaurants={foodTrucksTrend.length ? foodTrucksTrend : null}
          isNotNull={isFoodTruck}
        />
      </Type>
      <Type>
        <BestRate
          head="Fast food"
          restaurants={fastFoodTrend ? fastFoodTrend : null}
          isNotNull={isFastFood}
        />
      </Type>
      <Type>
        <BestRate
          head="Café"
          restaurants={cafeTrend ? cafeTrend : null}
          isNotNull={isCafe}
        />
      </Type>
      <Type>
        <BestRate
          head="Family style"
          restaurants={familyStyleTrend ? familyStyleTrend : null}
          isNotNull={isFamily}
        />
      </Type>
      <Type>
        <BestRate
          head="Pub"
          restaurants={pubTrend ? pubTrend : null}
          isNotNull={isPub}
        />
      </Type>
      <Type>
        <BestRate
          head="Buffet"
          restaurants={buffetTrend ? buffetTrend : null}
          isNotNull={isBuffet}
        />
      </Type>
      <BackTop />
    </>
  );
};

export default Trending;
