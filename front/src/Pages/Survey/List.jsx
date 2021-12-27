import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useContentListQuery } from "../../hooks/useContentListQuery";
import Item from "./Item";

const List = props => {
  const [target, setTarget] = useState(null);
  const { data, error, isLoading, fetchNextPage, isFetching } =
    useContentListQuery();

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(observerCallback, observerOptions);
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const observerOptions = { root: null, rootMargin: "0px", threshold: 1 };
  const observerCallback = async ([entries], observer) => {
    if (entries.isIntersecting) {
      fetchNextPage();
    }
  };
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
                return <Item key={idx} ref={setTarget} data={e} />;
              } else {
                return <Item key={idx} data={e} />;
              }
            })}
          </React.Fragment>
        ))}
      </ListWrap>
      <div>{isFetching ? <p>loading</p> : null}</div>
    </>
  );
};
const ListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
export default List;
