import axios from "axios";
import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ResultChart from "../../Components/Chart/ResultChart";

import Header from "../../Components/Header/Header";
import { ratingState } from "../../store/atoms";
import Item from "./Item";

const SurveyResult = props => {
  const rating = useRecoilValue(ratingState);
  const [resultContent, setResultContent] = useState({});
  const [resultOtt, setResultOtt] = useState({});
  useEffect(() => {
    axios.post("/api/contents/recommend", { data: rating }).then(res => {
      console.log(res);
      setResultContent(res.data[0]);
      setResultOtt(res.data[1]);
    });
  }, [rating]);

  return (
    <SurveyResultWrap>
      <Header />
      <ResultChart data={resultOtt} />
      <Content>
        {Object.entries(resultContent).map(([key, list], idx) => (
          <Item key={idx} id={key} data={list} />
        ))}
      </Content>
    </SurveyResultWrap>
  );
};
const SurveyResultWrap = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`;
const Content = styled.section`
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
`;
export default SurveyResult;
