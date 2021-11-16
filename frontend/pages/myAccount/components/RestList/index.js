import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import { FAVOURITE, INTEREST } from "../../constant";
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
import { useRouter } from "next/router";

const user_id = "618e861f44657266888550c3";

const RestList = (props) => {
  const isFav = props.type == FAVOURITE;
  const isIn = props.type == INTEREST;
  const listHead = isFav
    ? "My Favourite Restaurant"
    : isIn
    ? "My Interest"
    : null;

  const [favList, setFavList] = useState(null);
  const [inList, setInList] = useState(null);
  const REST_LIST = isFav ? favList : isIn ? inList : null;
  const isLarge = isFav ? "large" : "";
  const [popupVisible, setPopupVisible] = useState(false);
  const [edittedList, setEdittedList] = useState(null);
  const router = useRouter();

  function handleOk() {
    
    setFavList(edittedList);
    setPopupVisible(false);
    editMyFavList(user_id, edittedList);
  }


  useEffect(() => {
    getMyRestaurantList();
  }, []);

  const getMyRestaurantList = () => {
    UserAPI.getMyRestaurantList("myFavRestaurants", user_id)
      .then((response) => {
        setFavList(response.data);
        setEdittedList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    UserAPI.getMyRestaurantList("myInterestRestaurants", user_id)
      .then((response) => {
        setInList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editMyFavList = (user_id, edittedList) => {
    
    UserAPI.editMyFavList(user_id, edittedList)
      .then((response) => {
        console.log("edit",response.data);
        
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
        onOk={() => {router.reload(); handleOk();}}
        onCancel={() => setPopupVisible(false)}
      >
        <EditList list={favList} updateList={setEdittedList} />
      </Popup>
    </>
  );
};

export default RestList;
