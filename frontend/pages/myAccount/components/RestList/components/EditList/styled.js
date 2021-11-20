import styled from "styled-components";
import COLORS from "../../../../../../public/constant/colors";
import { BsFillBookmarkFill } from "react-icons/bs";
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import Button from "../../../../../components/Button";

export const PopupContainer = styled.div`
  width: 100%;
  font-size: 0.8rem;
`;

export const EdittableList = styled.ul`
  list-style-type: none;
  padding: 0;
  cursor: grab;
  overflow: hidden;
`;

export const ItemCard = styled.div`
  width: 100%;
  height: 80px;
  background: ${COLORS.PRIMARY_LIGHT};
  font-size: 1rem;
  margin: 10px 0 0 0;
  display: flex;
  overflow: hidden;
`;

export const RankingIcon = styled(BsFillBookmarkFill)`
  font-size: 30px;
  color: ${COLORS.PRIMARY_YELLOW};
  position: absolute;
`;

export const Ranking = styled.div`
  background: ${COLORS.PRIMARY_YELLOW};
  width: 20px;
  height: 20px;
  position: absolute;
  margin: 2px 0 0 5px;
  display: flex;
  justify-content: center;
  color: white;
`;

export const CardImage = styled.img`
  width: 80px;
  object-fit: cover;
  display: block;
`;

export const CardDetail = styled.div`
  display: flex;
  width: 100%;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const Description = styled.p`
  font-size: 0.8rem;
`;

export const DeleteButton = styled.button`
  margin: auto 10px auto auto;
  border: 0;
  background: ${COLORS.PRIMARY_LIGHT};
  //background: black;
  width: 40px;
  height: fit-content;
`;

export const BinIcon = styled(DeleteOutlined)`
  font-size: 20px;
  color: ${COLORS.LIGHT_GREY};
  cursor: pointer;
  &:hover {
    color: ${COLORS.DARK_GREY};
    font-size: 22px;
  }
`;

export const DeleteWarning = styled(Popconfirm)`
  .ant-popover-buttons {
    background: red;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled(Button)`
  width: 100px;
`;

export const EmptyListDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
`;
