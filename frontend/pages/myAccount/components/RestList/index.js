import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import { FAVOURITE, INTEREST } from "../../constant";
import { FAV_LIST, MY_INTEREST } from "./constant";
import EditList from "./components/EditList";
import Image from "next/image";
import Button from "../../../components/Button";
import {
  HeaderWrapper,
  CardsWrapper,
  ListHeader,
  EditButton,
  Popup,
  EmptyList,
  EmptyTextContainer,
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
  const REST_LIST = isFav ? favList : inList;
  const emptyDisplay = isFav ? "liked" : "saved";
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
        <EditButton
          visible={REST_LIST && REST_LIST.length > 1}
          onClick={() => setPopupVisible(true)}
        >
          Edit List
        </EditButton>
      </HeaderWrapper>

      <CardsWrapper>
        {REST_LIST ? (
          REST_LIST.length > 0 ? (
            REST_LIST.map((restuarant, index) => (
              <Card
                key={index}
                detail={restuarant}
                size={isLarge}
                showRank={isFav}
              />
            ))
          ) : (
            <EmptyList>
              <Image src="/assets/whiteBowl.svg" width={180} height={180} />
              <EmptyTextContainer>
                <b>Emypty List</b>
                <p>You haven't {emptyDisplay} any restaurant yet</p>
              </EmptyTextContainer>
              <Button variant="yellow">Explore</Button>
            </EmptyList>
          )
        ) : null}
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
