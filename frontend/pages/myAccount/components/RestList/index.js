import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import { FAVOURITE, INTEREST } from "../../constant";
import { FAV_LIST, MY_INTEREST } from "./constant";
import EditList from "../EditList";
import {
  HeaderWrapper,
  CardsWrapper,
  ListHeader,
  EditButton,
  Popup,
} from "./styled";

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

  function handleOk() {
    setPopupVisible(false);
  }

  useEffect(() => {
    console.log("FROM_CHILD", favList);
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
        <EditList list={favList} updateList={setFavList} />
      </Popup>
    </>
  );
};

export default RestList;
