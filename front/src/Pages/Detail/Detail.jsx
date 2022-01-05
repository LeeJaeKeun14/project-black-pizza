import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { useContentDetail } from "../../hooks/useContent";

const Detail = props => {
  const { id } = useParams();
  const contentDetail = useContentDetail(id);

  const runingtime = inputTime => {
    return inputTime
      .split(":")
      .map((e, i) => (i === 0 ? `${parseInt(e)}시간` : `${parseInt(e)}분`))
      .join(" ");
  };
  return (
    <DetailBlock>
      <Header />
      {contentDetail.isLoading ? (
        <div>loading...</div>
      ) : (
        <InfoBlock>
          <DetailTitle>{`${contentDetail.data.title} 상세정보`}</DetailTitle>
          <Info>
            <img src={contentDetail.data.image} alt="poster" />
            <div>
              <Title>{contentDetail.data.title}</Title>
              <YearGenreWrap>
                <Year>{contentDetail.data.open_year}</Year>
                <div>
                  {contentDetail.data.genre.map((e, i) => (
                    <GenreTag key={i}>{e.trim()}</GenreTag>
                  ))}
                </div>
              </YearGenreWrap>

              <div>{runingtime(contentDetail.data.runtime)}</div>
              <div>
                <SpanTitle>감독 </SpanTitle>
                <span> {contentDetail.data.director}</span>
              </div>
              <div>
                <SpanTitle>배우 </SpanTitle>
                {contentDetail.data.actor.map((e, i) => (
                  <span key={i}>
                    {i === contentDetail.data.actor.length - 1
                      ? `${e}`
                      : `${e} ・`}
                  </span>
                ))}
              </div>
            </div>
          </Info>
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
  justify-content: space-evenly;
  align-items: center;
  div + div {
    margin-top: 10px;
  }
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
export default Detail;
