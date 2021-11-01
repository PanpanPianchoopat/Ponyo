import React, { useState, useEffect } from "react";
import {
  OverviewContainer,
  RestName,
  Status,
  Line,
  Inline,
  Bookmark,
  BookmarkActive,
} from "./styled";
import { DATA } from "./constant";

const Overview = () => {
  const [isBookmarked, setBookmark] = useState(DATA.bookmark);

  function toggleBookmark() {
    setBookmark(!isBookmarked);
  }

  useEffect(
    () =>
      // print updated bookmark
      console.log(isBookmarked),
    [isBookmarked]
  );

  return (
    <OverviewContainer>
      <Line>
        <RestName>{DATA.name}</RestName>
        <Inline>
          <Status background={DATA.status}>{DATA.status.toUpperCase()}</Status>
          {isBookmarked ? (
            <BookmarkActive onClick={toggleBookmark} />
          ) : (
            <Bookmark onClick={toggleBookmark} />
          )}
        </Inline>
      </Line>
      <Line>{DATA.description}</Line>
    </OverviewContainer>
  );
};

export default Overview;
