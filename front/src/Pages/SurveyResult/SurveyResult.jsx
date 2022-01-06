import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { useResult } from "../../hooks/useResult";
import ChartDesc from "./ChartDesc";
import Item from "./Item";

const SurveyResult = props => {
  const surveyResult = useResult();

  return (
    <SurveyResultBlock>
      <Header />
      <Title>추천 결과</Title>
      {surveyResult.isLoading ? (
        <LoadingWrap>
          <img src="/images/pizzaLoading.gif" alt="loading" loading="lazy" />
        </LoadingWrap>
      ) : (
        <div>
          <ChartDesc ottData={surveyResult.data[1]} />
          <Content>
            {Object.entries(surveyResult.data[0]).map(([key, list], idx) => (
              <Item key={idx} id={key} data={list} />
            ))}
          </Content>
        </div>
      )}
    </SurveyResultBlock>
  );
};
const SurveyResultBlock = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`;
const Title = styled.h2`
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
`;
export default SurveyResult;
