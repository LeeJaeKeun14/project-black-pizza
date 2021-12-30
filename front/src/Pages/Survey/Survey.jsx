import React from "react";
import { useEffect } from "react";
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
  useEffect(() => {
    // console.log(ratingArr);
  }, [ratingArr]);
  const requestResult = async () => {
    // console.log(ratingArr);
    if (ratingArr.length > 0) {
      navigator("/result");
    } else {
      alert("1개이상 평점을 등록해주세요");
    }
  };
  return (
    <SurveyWrap>
      <Header />
      <div>
        <ProgressBar selectedCount={ratingArr.length} totalCount={5} />
        <Button onClick={requestResult}>추천영화 확인하기</Button>
      </div>

      <Content>
        <List />
      </Content>
    </SurveyWrap>
  );
};
const SurveyWrap = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`;
const Button = styled.button`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
const Content = styled.div`
  padding: 0 50px 50px;
`;
export default Survey;
