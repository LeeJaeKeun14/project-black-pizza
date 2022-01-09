import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useContentListQuery } from "../../hooks/useContentListQuery";
import { useQueryClient } from "react-query";
import Item from "./Item";

const List = props => {
  const [target, setTarget] = useState(null);
  const { data, error, isLoading, fetchNextPage, isFetching } =
    useContentListQuery();
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.resetQueries("contentList", { exact: true });
    };
  }, []);

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
      if (entries.boundingClientRect.y >= entries.rootBounds.height * 0.5) {
        fetchNextPage();
      }
    }
  };
  if (isLoading) return <p>loading...</p>;
  if (error) return <p>Error:{error.message}</p>;
  return (
    <>
      <ListWrap>
        {data ? (
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.result.map((e, idx) => {
                if (group.result.length === idx + 1) {
                  return <Item key={idx} ref={setTarget} data={e} />;
                } else {
                  return <Item key={idx} data={e} />;
                }
              })}
            </React.Fragment>
          ))
        ) : (
          <div>empty</div>
        )}
      </ListWrap>
      <div>{isFetching ? <p>loading...</p> : null}</div>
    </>
  );
};

const ListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
export default List;
