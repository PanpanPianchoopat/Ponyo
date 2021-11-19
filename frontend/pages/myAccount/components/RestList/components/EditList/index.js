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

const EditList = (props) => {
  const [favList, setFavList] = useState(props.list);

  const handleChange = (oldIndex, newIndex) => {
    setFavList(arrayMove(favList, oldIndex, newIndex));
  };

  const handleDelete = (index) => {
    setFavList(arrayRemove(favList, index));
  };

  const handleSubmit = () => {
    // change ranking in the list
    for (var i = 0; i < favList.length; i++) {
      favList[i].rank = i + 1;
    }
    //console.log("NEW_LIST", favList);
    props.updateList(favList);
    props.setVisible(false);
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
              <CardImage src={value.cover} />
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
