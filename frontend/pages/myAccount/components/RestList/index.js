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
  const REST_LIST = isFav ? favList : isIn ? inList : null;
  const isLarge = isFav ? "large" : "";
  const [popupVisible, setPopupVisible] = useState(false);
  const [edittedList, setEdittedList] = useState(FAV_LIST);

  function handleOk() {
    setFavList(edittedList);
    setPopupVisible(false);
  }

  useEffect(() => {
    // print updated list
    console.log("FAV_EDIT", favList);
  }, [favList]);

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
