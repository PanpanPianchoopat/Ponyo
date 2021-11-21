import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Image from "next/image";
import { List, arrayMove, arrayRemove } from "react-movable";
import UserAPI from "../../../../../api/userAPI";
import {
  PopupContainer,
  EdittableList,
  ItemCard,
  RankingIcon,
  Ranking,
  CardImage,
  CardDetail,
  TextContainer,
  Description,
  DeleteButton,
  BinIcon,
  DeleteWarning,
  ButtonGroup,
  StyledButton,
  EmptyListDisplay,
} from "./styled";

const EditList = (props) => {
  const [favList, setFavList] = useState(props.list);
  const [user_id, setUserID] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const userData = jwt.decode(token);
    if (userData) {
      setUserID(userData.id);
    }
  }, []);

  const handleChange = (oldIndex, newIndex) => {
    setFavList(arrayMove(favList, oldIndex, newIndex));
  };

  const handleDelete = (index) => {
    setFavList(arrayRemove(favList, index));
  };

  const handleSubmit = () => {
    const idFavList = [];
    // change ranking in the list
    for (var i = 0; i < favList.length; i++) {
      favList[i].rank = i + 1;
    }
    // Keep only id
    for (var i = 0; i < favList.length; i++) {
      idFavList[i] = favList[i]._id;
    }

    editMyFavList(user_id, idFavList);
  };

  const editMyFavList = (user_id, edittedList) => {
    UserAPI.editMyFavList(user_id, edittedList)
      .then((response) => {
        if (response.data.status) {
          props.updateList(favList);
          props.setVisible(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <PopupContainer>
      {favList.length > 0 ? (
        <>
          <p>Drag and drop to rearrange</p>
          <List
            values={favList}
            onChange={({ oldIndex, newIndex }) =>
              handleChange(oldIndex, newIndex)
            }
            renderList={({ children, props }) => (
              <EdittableList {...props}>{children}</EdittableList>
            )}
            renderItem={({ value, index, props }) => (
              <li {...props}>
                <ItemCard>
                  <RankingIcon />
                  <Ranking> {index + 1}</Ranking>
                  <CardImage src={value.image[1]} />
                  <CardDetail>
                    <TextContainer>
                      {value.name}
                      <Description>{value.description}</Description>
                    </TextContainer>
                    <DeleteWarning
                      title={`Are you sure to remove '${value.name}' from the list?`}
                      placement="topRight"
                      onConfirm={() => handleDelete(index)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteButton>
                        <BinIcon />
                      </DeleteButton>
                    </DeleteWarning>
                  </CardDetail>
                </ItemCard>
              </li>
            )}
          />
        </>
      ) : (
        <EmptyListDisplay>
          <Image src="/assets/redBowl.svg" width={100} height={100} />
          <p>Empty List</p>
        </EmptyListDisplay>
      )}
      <ButtonGroup>
        <StyledButton
          variant="transparent"
          outline="round"
          style={{ marginRight: "30px" }}
          onClick={() => props.setVisible(false)}
        >
          Cancel
        </StyledButton>
        <StyledButton
          variant="green"
          outline="round"
          onClick={() => handleSubmit()}
        >
          Save
        </StyledButton>
      </ButtonGroup>
    </PopupContainer>
  );
};

export default EditList;
