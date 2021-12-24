import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { ratingState } from "../../store/atoms";
import Item from "./Item";

const SurveyResult = props => {
  const rating = useRecoilValue(ratingState);
  const [result, setResult] = useState({});
  useEffect(() => {
    axios.post("/api/contents/recommend", { data: rating }).then(res => {
      console.log(res.data);
      setResult(res.data);
    });
  }, [rating]);
  return (
    <SurveyResultWrap>
      <Header />
      <Content>
        {Object.entries(result).map(([key, list], idx) => (
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
