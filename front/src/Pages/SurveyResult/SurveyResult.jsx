import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { recommendResult } from "../../store/atoms";
import ChartDesc from "./ChartDesc";
import Item from "./Item";

const SurveyResult = props => {
  const result = useRecoilValue(recommendResult);
  const imageRef = useRef();
  const refs = useMemo(() => {
    if (result.length !== 0) {
      return Object.entries(result[0]).map(() => React.createRef());
    }
  }, [result]);
  const gridArr = useMemo(() => {
    if (window.innerWidth >= 1024) {
      return [0, 0, 0, 0];
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      return [0, 0, 0];
    } else if (window.innerWidth >= 500 && window.innerWidth < 758) {
      return [0, 0];
    } else {
      return [0];
    }
  }, [result]);

  useEffect(() => {
    if (result.length !== 0) {
      let imgStack = gridArr;
      let colWidth = 250;
      for (let i = 0; i < refs.length; i++) {
        let minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
        let x = colWidth * minIndex;
        let y = imgStack[minIndex];
        if (refs[i].current) {
          imgStack[minIndex] += refs[i].current.offsetHeight + 20;
          refs[
            i
          ].current.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }

        if (i === refs.length - 1) {
          if (imageRef.current)
            imageRef.current.style.height = `${Math.max.apply(0, imgStack)}px`;
        }
      }
    }
  }, [result]);
  return (
    <SurveyResultBlock>
      <Header />
      <ResultContent>
        <Title>추천 결과</Title>
        {result.length === 0 ? (
          <LoadingWrap>
            <img src="/images/pizzaLoading.gif" alt="loading" loading="lazy" />
            <p>분석중 입니다...</p>
          </LoadingWrap>
        ) : (
          <div>
            <ChartDesc ottData={result[1]} />
            <Content ref={imageRef}>
              {Object.entries(result[0]).map(([key, list], idx) => (
                <Item ref={refs[idx]} key={idx} id={key} data={list} />
              ))}
            </Content>
          </div>
        )}
      </ResultContent>
    </SurveyResultBlock>
  );
};

const SurveyResultBlock = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`;
const ResultContent = styled.div`
  padding-top: 80px;
  height: 100%;
`;
const Title = styled.h2`
  text-align: center;
  padding: 30px 0;
  text-align: center;
`;
const LoadingWrap = styled.div`
  text-align: center;
  padding-top: 50px;
`;
const Content = styled.section`
  padding: 50px;
  height: 80vh;
  position: relative;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: center;
`;
export default SurveyResult;
