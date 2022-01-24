import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { loginState, ratingState, recommendResult } from "../../store/atoms";
import Category from "./Category";
import RatingContent from "./RatingContent";
const Survey = props => {
  const navigator = useNavigate();
  const [selectAllCategory, setSelectAllCategory] = useState(false);
  const setRatingState = useSetRecoilState(ratingState);
  const isLogin = useRecoilValue(loginState);
  const setRecommendResult = useSetRecoilState(recommendResult);

  useEffect(() => {
    if (!isLogin) {
      navigator("/");
      alert("로그인이 필요합니다.");
    }
  }, [isLogin, navigator]);

  useEffect(() => {
    setRatingState({});
    setRecommendResult([]);
  }, [setRatingState, setRecommendResult]);

  return (
    <SurveyWrap>
      <Header />
      {selectAllCategory ? (
        <SurveyContent>
          <RatingContent />
        </SurveyContent>
      ) : (
        <SurveyContent>
          <Category setSelectAllCategory={setSelectAllCategory} />
        </SurveyContent>
      )}
    </SurveyWrap>
  );
};
const SurveyWrap = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`;
const SurveyContent = styled.div`
  padding-top: 80px;
  height: 100%;
`;
export default Survey;
