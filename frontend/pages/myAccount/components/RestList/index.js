import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import { FAVOURITE, INTEREST } from "../../constant";
import { FAV_LIST, MY_INTEREST } from "./constant";
import EditList from "./components/EditList";
import {
  HeaderWrapper,
  CardsWrapper,
  ListHeader,
  EditButton,
  Popup,
} from "./styled";
import { Router } from "next/dist/client/router";
import UserAPI from "../../../api/userAPI";

const user_id = "618e861f44657266888550c3";

const RestList = (props) => {
  const isFav = props.type == FAVOURITE;
  const isIn = props.type == INTEREST;
  const listHead = isFav
    ? "My Favourite Restaurant"
    : isIn
    ? "My Interest"
    : null;

  const [favList, setFavList] = useState(FAV_LIST);
  const [inList, setInList] = useState(MY_INTEREST);
  const [favList1, setFavList1] = useState(null);
  const [inList1, setInList1] = useState(null);
  const REST_LIST = isFav ? favList1 : isIn ? inList1 : null;
  const isLarge = isFav ? "large" : "";
  const [popupVisible, setPopupVisible] = useState(false);
  const [edittedList, setEdittedList] = useState(FAV_LIST);

  function handleOk() {
    setFavList(edittedList);
    setPopupVisible(false);
  }

  useEffect(() => {
    getMyRestaurantList();
  }, []);


  const getMyRestaurantList = () => {
    UserAPI.getMyRestaurantList("myFavRestaurants", user_id)
      .then((response) => {
        setFavList1(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    UserAPI.getMyRestaurantList("myInterestRestaurants", user_id)
      .then((response) => {
        setInList1(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <HeaderWrapper headerType={props.type}>
        <ListHeader>{listHead}</ListHeader>
        <EditButton visible={isFav} onClick={() => setPopupVisible(true)}>
          Edit List
        </EditButton>
      </HeaderWrapper>

      <CardsWrapper>
        {REST_LIST
          ? REST_LIST.map((restuarant, index) => (
              <Card
                key={index}
                rank={index}
                detail={restuarant}
                size={isLarge}
                showRank={isFav}
              />
            ))
          : null}
      </CardsWrapper>

      <Popup
        title="Edit Top 5 Favourite List"
        visible={popupVisible}
        okText="Save"
        onOk={handleOk}
        onCancel={() => setPopupVisible(false)}
      >
        <EditList list={favList} updateList={setEdittedList} />
      </Popup>
    </>
  );
};

export default RestList;
