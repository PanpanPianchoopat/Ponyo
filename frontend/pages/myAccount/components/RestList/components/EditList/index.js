import React, { useState, useEffect } from "react";
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
} from "./styled";

import { List, arrayMove, arrayRemove } from "react-movable";
import UserAPI from "../../../../../api/userAPI";

const EditList = (props) => {
  const [favList, setFavList] = useState(props.list);
  const user_id = "618e861f44657266888550c3";

  useEffect(() => {
    // if there's a change in fav list, reorder the rankings
    for (var i = 0; i < favList.length; i++) {
      favList[i].rank = i + 1;
    }
    console.log("NEW_LIST", favList);
    props.updateList(favList); //send new list back to parent
  }, [favList]);

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
      idFavList[i] = favList[i]._id
    }
    console.log("NEW_LIST", idFavList);
    editMyFavList(user_id, idFavList);
    props.updateList(favList);
    props.setVisible(false);
  };

  const editMyFavList = (user_id, edittedList) => {
    UserAPI.editMyFavList(user_id, edittedList)
      .then((response) => {
        console.log("edit", response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <PopupContainer>
      Drag and drop to rearrange
      <List
        values={favList}
        onChange={({ oldIndex, newIndex }) => handleChange(oldIndex, newIndex)}
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
