import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { ratingStateResult } from "../../store/atoms";
import List from "./List";

const Survey = props => {
  const navigator = useNavigate();
  const ratingArr = useRecoilValue(ratingStateResult);
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/contents/list")
      .then(res => {
        setList(res.data.list);
      })
      .catch(console.log);
  }, []);

  const requestResult = async () => {
    console.log(ratingArr);
    if (ratingArr.length > 0) {
      navigator("/result");
    } else {
      alert("1개이상 평점을 등록해주세요");
    }
  };
  return (
    <SurveyWrap>
      <Header />
      <Content>
        <ProgressBar selectedCount={ratingArr.length} totalCount={5} />
        <button onClick={requestResult}>click</button>
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
  padding: 0 50px 50px;
`;
export default Survey;
