import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { useContentDetail } from "../../hooks/useContent";
import { useUserPickPost } from "../../hooks/useUserPick";

const Detail = props => {
  const { id } = useParams();
  const { data, isLoading } = useContentDetail(parseInt(id));
  const [isPicked, setIsPicked] = useState(false);
  const userPickPost = useUserPickPost();

  useEffect(() => {
    if (data) setIsPicked(data.is_picked);
  }, [data]);

  useEffect(() => {
    if (userPickPost.isSuccess) {
      setIsPicked(cur => !cur);
    }
  }, [userPickPost.isSuccess]);

  const runningTime = inputTime => {
    return inputTime
      .split(":")
      .map((e, i) => (i === 0 ? `${parseInt(e)}시간` : `${parseInt(e)}분`))
      .join(" ");
  };
  const postUserPick = () => {
    userPickPost.mutate([{ contents_id: parseInt(id), is_picked: true }]);
  };

  const cancelUserPick = () => {
    userPickPost.mutate([{ contents_id: parseInt(id), is_picked: false }]);
  };

  return (
    <DetailBlock>
      <Header />
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <InfoBlock>
          <DetailTitle>{`${data.title} 상세정보`}</DetailTitle>
          <Info>
            <img src={data.image} alt="poster" />
            <InfoTextPart>
              <Title>{data.title}</Title>
              <YearGenreWrap>
                <Year>{data.open_year}</Year>
                <div>
                  {data.genre.map((e, i) => (
                    <GenreTag key={i}>{e.trim()}</GenreTag>
                  ))}
                </div>
              </YearGenreWrap>

              <div>{runningTime(data.runtime)}</div>
              <div>
                <SpanTitle>감독 </SpanTitle>
                <span> {data.director}</span>
              </div>
              <div>
                <SpanTitle>배우 </SpanTitle>
                {data.actor.map((e, i) => (
                  <span key={i}>
                    {i === data.actor.length - 1 ? `${e}` : `${e} ・`}
                  </span>
                ))}
              </div>
              {isPicked ? (
                <Button onClick={cancelUserPick} isPicked={isPicked}>
                  찜 취소
                </Button>
              ) : (
                <Button onClick={postUserPick} isPicked={isPicked}>
                  찜하기
                </Button>
              )}
            </InfoTextPart>
          </Info>
          <SynopsisPart>
            <SynopsisTitle>시놉시스</SynopsisTitle>
            <p>{data.synopsis}</p>
          </SynopsisPart>
        </InfoBlock>
      )}
    </DetailBlock>
  );
};
const DetailBlock = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  height: 100%;
`;
const InfoBlock = styled.div`
  padding-top: 50px;
`;

const DetailTitle = styled.h1`
  text-align: center;
  padding: 30px 0;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;
  align-items: center;
  div + div {
    margin-top: 10px;
  }
`;
const InfoTextPart = styled.div`
  padding-left: 50px;
`;
const Title = styled.h2`
  ${({ theme }) => theme.font.large}
`;
const Year = styled.div`
  padding-right: 16px;
`;
const YearGenreWrap = styled.div`
  display: flex;
  align-items: baseline;
`;
const GenreTag = styled.span`
  background-color: ${({ theme }) => theme.color.coral};
  padding: 4px 5px;
  border-radius: 6px;
  & + & {
    margin-left: 5px;
  }
`;
const SpanTitle = styled.span`
  font-weight: bold;
`;
const SynopsisPart = styled.div`
  padding: 50px;
`;
const SynopsisTitle = styled.div`
  font-weight: bold;
`;
const Button = styled.button`
  background-color: ${props =>
    props.isPicked ? ({ theme }) => theme.color.coral : "#ffffff00"};
  border: ${props => (props.isPicked ? "none" : "1px solid white")};
  padding: 8px 16px;
  border-radius: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.font};
  margin-top: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.color.coral};
    border-color: runningTime ${({ theme }) => theme.color.coral};
  }
`;
export default Detail;
