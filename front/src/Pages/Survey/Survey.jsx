import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { ratingState } from "../../store/atoms";
import { media } from "../../styles/theme";
import List from "./List";

const Survey = props => {
  const navigator = useNavigate();
  const rating = useRecoilValue(ratingState);
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/contents/list ")
      .then(res => {
        setList(res.data);
      })
      .catch(console.log);
  }, []);

  const requestResult = async () => {
    console.log(rating);
    if (rating.length > 0) {
      navigator("/result");
    } else {
      alert("1개이상 평점을 등록해주세요");
    }
  };
  return (
    <SurveyWrap>
      <Header />
      <ProgressBar selectedCount={rating.length} totalCount={5} />
      <button onClick={requestResult}>click</button>
      <Content>
        <List data={list} />
      </Content>
    </SurveyWrap>
  );
};
const SurveyWrap = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`;

const Content = styled.div`
  padding: 50px;
  // margin: 0 auto;
  ${media.mobile} {
  }
`;
export default Survey;
