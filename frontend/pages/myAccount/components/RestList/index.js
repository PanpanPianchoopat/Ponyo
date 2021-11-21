import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import { FAVOURITE, INTEREST } from "../../../../public/constant/myAccount";
import EditList from "./components/EditList";
import Image from "next/image";
import UserAPI from "../../../api/userAPI";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { LoadingIcon } from "./styled";
import {
  HeaderWrapper,
  CardsWrapper,
  ListHeader,
  EditButton,
  Popup,
  EmptyList,
  EmptyTextContainer,
} from "./styled";

const RestList = (props) => {
  const router = useRouter();
  const LOADING = <LoadingIcon spin />;
  const isFav = props.type == FAVOURITE;
  const isIn = props.type == INTEREST;
  const listHead = isFav
    ? "My Favourite Restaurant"
    : isIn
    ? "My Interest"
    : null;
  const [user_id, setUserID] = useState(null);
  const emptyDisplay = isFav ? "liked" : "saved";
  const isLarge = isFav ? "large" : "";
  const [popupVisible, setPopupVisible] = useState(false);
  const [edittedList, setEdittedList] = useState(null);
  const [edittable, setEdittable] = useState(false);
  useEffect(() => {
    const isEdittable =
      props.type == FAVOURITE && edittedList && edittedList.length > 0;
    if (isEdittable) {
      setEdittable(true);
    } else {
      setEdittable(false);
    }
  }, [props.type, edittedList]);

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setUserID(userData.id);
    }
  }, []);

  useEffect(() => {
    if (user_id != null) {
      setEdittedList(null);
      getMyRestaurantList();
    }
  }, [props.type, user_id]);

  const getMyRestaurantList = () => {
    if (props.type == FAVOURITE) {
      UserAPI.getMyRestaurantList("myFavRestaurants", user_id)
        .then((response) => {
          setEdittedList(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (props.type == INTEREST) {
      UserAPI.getMyRestaurantList("myInterestRestaurants", user_id)
        .then((response) => {
          setEdittedList(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <HeaderWrapper headerType={props.type}>
        <ListHeader>{listHead}</ListHeader>
        <EditButton visible={edittable} onClick={() => setPopupVisible(true)}>
          Edit List
        </EditButton>
      </HeaderWrapper>

      <CardsWrapper>
        {edittedList ? (
          edittedList.length > 0 ? (
            edittedList.map((restuarant, index) => (
              <Card
                key={index}
                rank={index}
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
              <Button variant="yellow" onClick={() => router.push("/search")}>
                Explore
              </Button>
            </EmptyList>
          )
        ) : (
          <Spin indicator={LOADING} />
        )}
      </CardsWrapper>

      <Popup
        title="Edit Top 5 Favourite List"
        visible={popupVisible}
        destroyOnClose={true}
        onCancel={() => setPopupVisible(false)}
        footer={null}
      >
        <EditList
          list={edittedList}
          updateList={setEdittedList}
          setVisible={setPopupVisible}
        />
      </Popup>
    </>
  );
};

export default RestList;
