import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { recommendResult } from "../../store/atoms";
import ChartDesc from "./ChartDesc";
import Item from "./Item";

const SurveyResult = props => {
  const result = useRecoilValue(recommendResult);
  return (
    <SurveyResultBlock>
      <Header />
      <ResultContent>
        <Title>추천 결과</Title>
        {result.length === 0 ? (
          <LoadingWrap>
            <img src="/images/pizzaLoading.gif" alt="loading" loading="lazy" />
          </LoadingWrap>
        ) : (
          <div>
            <ChartDesc ottData={result[1]} />
            <Content>
              {Object.entries(result[0]).map(([key, list], idx) => (
                <Item key={idx} id={key} data={list} />
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export default SurveyResult;
