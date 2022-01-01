import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useContentListQuery } from "../../hooks/useContentListQuery";
import Item from "./Item";
import useIntersectionObserver from "./useIntersectionObserver";

const List = props => {
  const lastRef = useRef();
  const { data, error, isLoading, fetchNextPage, isFetching, hasNextPage } =
    useContentListQuery();

  useIntersectionObserver({
    target: lastRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });
  return isLoading ? (
    <p>loading</p>
  ) : error ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <ListWrap>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.result.map((e, idx) => {
              if (group.result.length === idx + 1) {
                return <Item key={idx} data={e} />;
              } else {
                return <Item key={idx} data={e} />;
              }
            })}
          </React.Fragment>
        ))}
      </ListWrap>
      <button ref={lastRef} onClick={() => fetchNextPage()}>
        here
      </button>
      <div>{isFetching ? <p>loading</p> : null}</div>
    </>
  );
};
const ListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
export default List;
