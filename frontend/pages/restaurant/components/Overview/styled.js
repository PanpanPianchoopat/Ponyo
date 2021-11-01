import styled from "styled-components";
import COLORS from "../../../../public/constant/colors";
import BREAKPOINTS from "../../../../public/constant/breakpoints";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export const OverviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Line = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  align-items: center;
  font-size: 1rem;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    font-size: 0.8rem;
  }
`;

export const Inline = styled.div`
  display: flex;
  align-items: center;
`;

export const RestName = styled.b`
  font-size: 2rem;
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    font-size: 1rem;
  }
`;

export const Status = styled.div.attrs((props) => {
  const bgColor =
    props.background === "open" ? COLORS.LIGHT_GREEN : COLORS.PRIMARY_RED;
  return { bgColor };
})`
  background: ${(props) => props.bgColor};
  color: white;
  height: fit-content;
  padding: 0 10px;
  border-radius: 5px;
  margin-right: 10px;
`;

export const Bookmark = styled(BsBookmark)`
  font-size: 25px;
  color: ${COLORS.LIGHT_GREY};
`;

export const BookmarkActive = styled(BsBookmarkFill)`
  font-size: 25px;
  color: ${COLORS.PRIMARY_BLUE};
`;
