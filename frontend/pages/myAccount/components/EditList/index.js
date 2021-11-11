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
} from "./styled";

import { List, arrayMove, arrayRemove } from "react-movable";
import COLORS from "../../../../public/constant/colors";
import { Tooltip } from "antd";

const EditList = (props, { setPopupVisible }) => {
  const [favList, setFavList] = useState(props.list);

  useEffect(() => {
    // if there's a change in fav list, reorder the rankings
    for (var i = 0; i < favList.length; i++) {
      favList[i].rank = i + 1;
    }
  }, [favList]);

  return (
    <PopupContainer>
      Drag and drop to rearrange
      <List
        values={favList}
        onChange={({ oldIndex, newIndex }) =>
          setFavList(arrayMove(favList, oldIndex, newIndex))
        }
        renderList={({ children, props }) => (
          <EdittableList {...props}>{children}</EdittableList>
        )}
        renderItem={({ value, index, props }) => (
          <li {...props}>
            <ItemCard>
              <RankingIcon />
              <Ranking> {index + 1}</Ranking>
              <CardImage src={value.picture} />
              <CardDetail>
                <TextContainer>
                  {value.name}
                  <Description>{value.description}</Description>
                </TextContainer>
                <DeleteWarning
                  title={`Are you sure to remove '${value.name}' from the list?`}
                  placement="topRight"
                  onConfirm={() => setFavList(arrayRemove(favList, index))}
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
    </PopupContainer>
  );
};

export default EditList;
