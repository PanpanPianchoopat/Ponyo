/*******************************************************************************
 * RestList component - restaurant list created by user both favourite/interest.
 * 'type' is type of the list. It can be FAVOURITE or INTEREST constant.
 ******************************************************************************/

import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import { FAVOURITE, INTEREST } from "../../../../public/constant/myAccount";
import EditList from "./components/EditList";
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
  EmptyIcon,
  EmptyTextContainer,
  Loading,
  SmileIcon,
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
  const [userID, setUserID] = useState(null);
  const emptyDisplay = isFav ? "liked" : "saved"; // empty list text
  const isLarge = isFav ? "large" : "";
  const [popupVisible, setPopupVisible] = useState(false);
  const [edittedList, setEdittedList] = useState(null);
  const [edittable, setEdittable] = useState(false);
  const [loading, setLoading] = useState(false); // loading spin visibility

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setUserID(userData.id);
    }
  }, []);

  useEffect(() => {
    // If there is user formation, get his/her list from the database.
    if (userID != null) {
      setEdittedList(null);
      getMyRestaurantList();
    }
  }, [props.type, userID]);

  /* When there are changes in type or editted list, always check their values
   * in order to set edit button visiblity.
   */
  useEffect(() => {
    // If it is favourite list and the list is not empty, the list is edittable.
    const isEdittable =
      props.type == FAVOURITE && edittedList && edittedList.length > 0;
    if (isEdittable) {
      setEdittable(true);
    } else {
      setEdittable(false);
    }
  }, [props.type, edittedList]);

  /* This function retrieve restaurant list from the database according to the
   * type passed in props.
   */
  const getMyRestaurantList = () => {
    if (props.type == FAVOURITE) {
      UserAPI.getMyRestaurantList("myFavRestaurants", userID)
        .then((response) => {
          setEdittedList(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (props.type == INTEREST) {
      UserAPI.getMyRestaurantList("myInterestRestaurants", userID)
        .then((response) => {
          setEdittedList(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  /* Set loading status to true and redirect to search page */
  const goToSearch = () => {
    setLoading(true);
    router.push("/search");
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
                rank={index + 1}
                detail={restuarant}
                size={isLarge}
                showRank={isFav}
              />
            ))
          ) : (
            <EmptyList>
              {loading === true ? (
                <Loading>
                  <Spin indicator={<SmileIcon spin />} />
                  loading
                </Loading>
              ) : (
                <EmptyList>
                  <EmptyIcon src="/assets/whiteBowl.svg" />
                  <EmptyTextContainer>
                    <b>Emypty List</b>
                    <p>You haven't {emptyDisplay} any restaurant yet</p>
                  </EmptyTextContainer>
                </EmptyList>
              )}
              <Button variant="yellow" onClick={goToSearch}>
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
