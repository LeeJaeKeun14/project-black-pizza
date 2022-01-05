import React from "react";
import styled from "styled-components";
import ResultChart from "../../Components/Chart/ResultChart";

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
        <div>loading...</div>
      ) : (
        <div>
          <ChartDesc ottData={surveyResult.data[1]} />
          {/* <ChartBlock>
            <ResultChart data={surveyResult.data[1]} />
            <div>
              <div>회원님에게 추천하는 OTT 서비스는 00입니다.</div>
              <div></div>
            </div>
          </ChartBlock> */}

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
const ChartBlock = styled.section`
  display: flex;
  justify-content: space-around;
`;
const Content = styled.section`
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
`;
export default SurveyResult;
