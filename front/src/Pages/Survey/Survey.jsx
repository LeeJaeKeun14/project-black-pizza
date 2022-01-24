import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import {
  loginState,
  ratingState,
  ratingStateResult,
  recommendResult,
} from "../../store/atoms";
import Category from "./Category";
import List from "./List";
import { userSelectedGenres, userSelectedYears } from "../../store/atoms";
import { useResultPost } from "../../hooks/useResult";
import { useMemo } from "react";
import RatingContent from "./RatingContent";
const Survey = props => {
  const navigator = useNavigate();
  const [selectAllCategory, setSelectAllCategory] = useState(false);
  const ratingArr = useRecoilValue(ratingStateResult);
  const setRatingState = useSetRecoilState(ratingState);
  const isLogin = useRecoilValue(loginState);
  const userGenres = useRecoilValue(userSelectedGenres);
  const userYears = useRecoilValue(userSelectedYears);
  const setRecommendResult = useSetRecoilState(recommendResult);
  const SELECT_COUNT = 5;
  const surveyResult = useResultPost();

  const [buttonState, setButtonState] = useState(0);
  const [goNext, setGoNext] = useState(false);
  useEffect(() => {
    if (!isLogin) {
      navigator("/");
      alert("로그인이 필요합니다.");
    }
  }, [isLogin, navigator]);

  useEffect(() => {
    setRatingState({});
    setRecommendResult([]);
  }, []);

  const goSelectYear = () => {
    if (userGenres.length === 0) {
      alert("하나 이상의 장르를 선택해주세요");
    } else {
      setGoNext(true);
      setButtonState(1);
    }
  };

  const goRatingStep = () => {
    if (userGenres.length === 0 || userYears.length === 0) {
      alert("하나 이상의 연도를 모두 선택해주세요");
    } else {
      setSelectAllCategory(!selectAllCategory);
      setButtonState(2);
    }
  };

  const goResultPage = () => {
    if (ratingArr.length < SELECT_COUNT) {
      alert(`${SELECT_COUNT}개 이상의 콘텐츠를 평가하거나 찜해주세요`);
    } else {
      surveyResult.mutate(ratingArr);
      navigator("/result");
    }
  };

  const renderButton = useMemo(() => {
    if (buttonState === 0)
      return (
        <Button isDisabled={userGenres.length === 0} onClick={goSelectYear}>
          다음 질문
        </Button>
      );
    else if (buttonState === 1) {
      return (
        <Button
          isDisabled={userGenres.length === 0 || userYears.length === 0}
          onClick={goRatingStep}
        >
          평가하기
        </Button>
      );
    } else {
      return (
        <Button
          isDisabled={ratingArr.length < SELECT_COUNT}
          onClick={goResultPage}
        >
          추천 확인하기
        </Button>
      );
    }
  }, [
    buttonState,
    goNext,
    ratingArr.length,
    userGenres.length,
    userYears.length,
  ]);
  useEffect(() => {
    console.log(selectAllCategory);
  }, [selectAllCategory]);
  return (
    <SurveyWrap>
      <Header />
      {/* {renderButton} */}
      {selectAllCategory ? (
        <SurveyContent>
          {/* <div>
            <Button
              isDisabled={ratingArr.length < SELECT_COUNT}
              onClick={goResultPage}
            >
              추천 확인하기
            </Button>
            <ProgressBar selectedCount={ratingArr.length} totalCount={5} />
          </div>
          <Content>
            <Question>
              {SELECT_COUNT}개 이상의 콘텐츠를 평가하거나 찜해주세요
            </Question>
            <List />
          </Content> */}
          <RatingContent />
        </SurveyContent>
      ) : (
        <SurveyContent>
          {/* <Button
            isDisabled={userGenres.length === 0 || userYears.length === 0}
            onClick={goRatingStep}
          >
            평가하기
          </Button> */}
          {/* <Category goNext={goNext} /> */}
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
const Button = styled.button`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.color.font};
  background-color: ${props =>
    props.isDisabled
      ? ({ theme }) => theme.color.background3
      : ({ theme }) => theme.color.coral};
  border: none;
  padding: 10px;
  padding-top: 80px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.color.coral};
  }
`;
const Content = styled.div`
  padding: 0 50px 50px;
`;
const Question = styled.p`
  padding: 30px 0;
  text-align: center;
`;
export default Survey;
