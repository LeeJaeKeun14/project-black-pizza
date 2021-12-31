import React from "react";
import { useMemo } from "react";
import styled from "styled-components";

const ContentDetail = ({ data }) => {
  const runingtime = useMemo(() => {
    return data.runtime
      .split(":")
      .map((e, i) => (i === 0 ? `${parseInt(e)}시간` : `${parseInt(e)}분`))
      .join(" ");
  }, [data.runtime]);
  return (
    <ContentDetailBlock>
      <Title>{data.title}</Title>
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
      <button>찜</button>
    </ContentDetailBlock>
  );
};

const ContentDetailBlock = styled.div`
  position: absolute;
  width: 50%;
  right: 0;
  top: 70%;
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
  border-radius: 2px;
  & + & {
    margin-left: 5px;
  }
`;
const SpanTitle = styled.span`
  font-weight: bold;
`;
export default ContentDetail;
