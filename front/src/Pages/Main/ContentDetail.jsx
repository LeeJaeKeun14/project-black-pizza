import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { useTheme } from "styled-components";
import { useContentDetail } from "../../hooks/useContent";
import { useUserPickPost } from "../../hooks/userPick";

const ContentDetail = ({ data, id }) => {
  const queryClient = useQueryClient();
  const [isPicked, setIsPicked] = useState(null);
  const contentDetail = useContentDetail(id);
  const userPickPost = useMutation(input => {
    // const postInput = [{ contents_id: contentId, is_picked: true }];
    return axios.post("/api/contents/userpick", input);
  });

  useEffect(() => {
    if (userPickPost.isSuccess) {
      setIsPicked(cur => !cur);
    }
  }, [userPickPost.isSuccess]);

  useEffect(() => {
    return () => {
      console.log("out");
      // queryClient.removeQueries(["contentList", id], { exact: true });
    };
  }, []);

  useEffect(() => {
    axios
      .get(`/api/contents/detail/${id}`)
      .then(res => console.log(res.data.is_picked));

    console.log(id, contentDetail.data.is_picked);
    setIsPicked(contentDetail.data.is_picked);
  }, [contentDetail.data.is_picked, id]);

  const runingtime = useMemo(() => {
    return data.runtime
      .split(":")
      .map((e, i) => (i === 0 ? `${parseInt(e)}시간` : `${parseInt(e)}분`))
      .join(" ");
  }, [data.runtime]);

  const postUserPick = () => {
    console.log("click");
    // userPickPost.refetch()
    userPickPost.mutate([{ contents_id: id, is_picked: true }]);
  };

  const cancelUserPick = () => {
    userPickPost.mutate([{ contents_id: id, is_picked: false }]);
  };
  return (
    <ContentDetailBlock>
      <TitleWrap>
        <Title>{data.title}</Title>
        {isPicked ? (
          <Button onClick={cancelUserPick} isPicked={isPicked}>
            찜 취소
          </Button>
        ) : (
          <Button onClick={postUserPick} isPicked={isPicked}>
            찜하기
          </Button>
        )}
      </TitleWrap>

      <Wrap>
        <Year>{data.open_year}</Year>
        <div>
          {data.genre.map((e, i) => (
            <GenreTag key={i}>{e.trim()}</GenreTag>
          ))}
        </div>
      </Wrap>
      <div>
        <span>{runingtime}</span>
      </div>
      <div>
        <SpanTitle>감독 </SpanTitle>
        <span>{data.director}</span>
      </div>
      <div>
        <SpanTitle>배우 </SpanTitle>
        {data.actor.map((e, i) => (
          <span key={i}>
            {i === data.actor.length - 1 ? `${e}` : `${e} ・`}
          </span>
        ))}
      </div>
    </ContentDetailBlock>
  );
};

const ContentDetailBlock = styled.div`
  position: absolute;
  width: 40%;
  right: 10%;
  top: 50%;
`;
const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  background-color: ${props =>
    props.isPicked ? ({ theme }) => theme.color.coral : "#ffffff00"};
  border: ${props => (props.isPicked ? "none" : "1px solid white")};
  padding: 8px 16px;
  border-radius: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.font};
  margin-left: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.color.coral};
    border-color: ${({ theme }) => theme.color.coral};
  }
`;
const Wrap = styled.div`
  display: flex;
  align-items: baseline;
`;
const Title = styled.h1`
  ${({ theme }) => theme.font.large}
`;
const Year = styled.div`
  padding-right: 5px;
`;
const GenreTag = styled.span`
  background-color: ${({ theme }) => theme.color.coral};
  padding: 2px 5px;
  border-radius: 6px;
  & + & {
    margin-left: 5px;
  }
`;
const SpanTitle = styled.span`
  font-weight: bold;
`;

export default ContentDetail;
