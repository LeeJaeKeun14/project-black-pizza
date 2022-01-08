import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useContentDetail } from "../../hooks/useContent";
import { useUserPickPost } from "../../hooks/useUserPick";
import { loginState } from "../../store/atoms";
import { media } from "../../styles/theme";

const ContentDetail = ({ id }) => {
  const { data, isLoading } = useContentDetail(id);
  const userPickPost = useUserPickPost();
  const [isPicked, setIsPicked] = useState(false);
  const isLogin = useRecoilValue(loginState);
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  useEffect(() => {
    if (userPickPost.isSuccess) {
      setIsPicked(cur => !cur);
    }
  }, [userPickPost.isSuccess]);

  useEffect(() => {
    if (data) {
      setIsPicked(data.is_picked);
    }
  }, [data]);

  const runningTime = useMemo(() => {
    if (data) {
      return data.runtime
        .split(":")
        .map((e, i) => (i === 0 ? `${parseInt(e)}시간` : `${parseInt(e)}분`))
        .join(" ");
    }
  }, [data]);

  const postUserPick = () => {
    if (!isLogin) {
      alert("로그인시 이용가능 합니다.");
    } else {
      userPickPost.mutate([{ contents_id: id, is_picked: true }]);
    }
  };

  const cancelUserPick = () => {
    userPickPost.mutate([{ contents_id: id, is_picked: false }]);
  };

  if (isLoading) return <div>loading...</div>;
  return (
    <ContentDetailBlock>
      <ImageWrap>
        <Image src={data.image} alt="poster" loading="lazy" />
      </ImageWrap>
      <InfoWrap>
        <TitleWrap>
          <Title>{data.title}</Title>
          {isLogin ? (
            isPicked ? (
              <Button onClick={cancelUserPick} isPicked={isPicked}>
                찜 취소
              </Button>
            ) : (
              <Button onClick={postUserPick} isPicked={isPicked}>
                찜하기
              </Button>
            )
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
          <span>{runningTime}</span>
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
      </InfoWrap>
    </ContentDetailBlock>
  );
};

const ContentDetailBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 80%;
  justify-content: space-around;
  margin: 0 auto;
`;
const ImageWrap = styled.div`
  height: 80%;
  ${media.mobile} {
    display: none;
  }
`;
const Image = styled.img`
  display: block;
  height: 100%;
  border-radius: 15px;
`;
const InfoWrap = styled.div`
  padding: 0 10px;
`;
const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  background-color: ${props =>
    props.isPicked ? ({ theme }) => theme.color.coral : "#ffffff00"};
  border: ${props => (props.isPicked ? "none" : "1px solid white")};
  padding: 0.5rem 1rem;
  border-radius: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.font};
  margin-left: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.color.coral};
    border-color: runningTime ${({ theme }) => theme.color.coral};
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
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  & + & {
    margin-left: 5px;
  }
`;
const SpanTitle = styled.span`
  font-weight: bold;
`;

export default ContentDetail;
