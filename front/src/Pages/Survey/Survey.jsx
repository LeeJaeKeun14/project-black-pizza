import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { loginState, ratingStateResult } from "../../store/atoms";
import Category from "./Category";
import List from "./List";
import { userSelectedGenres, userSelectedYears } from "../../store/atoms";
const Survey = props => {
  const navigator = useNavigate();
  const [hasCategory, setHasCategory] = useState(false);
  const ratingArr = useRecoilValue(ratingStateResult);
  const isLogin = useRecoilValue(loginState);
  const userGenres = useRecoilValue(userSelectedGenres);
  const userYears = useRecoilValue(userSelectedYears);
  useEffect(() => {
    if (!isLogin) {
      navigator("/");
      alert("로그인이 필요합니다.");
    }
  }, [isLogin, navigator]);
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

      {hasCategory ? (
        <div>
          <div>
            <ProgressBar selectedCount={ratingArr.length} totalCount={5} />
            <Button onClick={requestResult}>추천영화 확인하기</Button>
          </div>
          <Content>
            <List />
          </Content>
        </div>
      ) : (
        <div>
          <button
            disabled={userGenres.length === 0 || userYears.length === 0}
            onClick={() => setHasCategory(!hasCategory)}
          >
            set category
          </button>
          <Category />
        </div>
      )}
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
