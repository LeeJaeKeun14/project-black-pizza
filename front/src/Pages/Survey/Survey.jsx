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
  const [selectAllCategory, setSelectAllCategory] = useState(false);
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
  const requestResult = () => {
    console.log(ratingArr);
    if (ratingArr.length > 5) {
      navigator("/result");
    } else {
      alert("5개 이상의 콘텐츠를 평가하거나 찜해주세요");
    }
  };
  const gotoRating = () => {
    if (userGenres.length === 0 || userYears.length === 0) {
      alert("장르와 연도를 모두 선택해주세요");
    } else {
      setSelectAllCategory(!selectAllCategory);
    }
  };
  return (
    <SurveyWrap>
      <Header />
      {selectAllCategory ? (
        <div>
          <div>
            <Button isDisabled={ratingArr.length < 5} onClick={requestResult}>
              추천영화 확인하기
            </Button>
            <ProgressBar selectedCount={ratingArr.length} totalCount={5} />
          </div>
          <Content>
            <Question>5개 이상의 콘텐츠를 평가하거나 찜해주세요</Question>
            <List />
          </Content>
        </div>
      ) : (
        <div>
          <Button
            isDisabled={userGenres.length === 0 || userYears.length === 0}
            onClick={gotoRating}
          >
            평가하기
          </Button>
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
  color: ${({ theme }) => theme.color.font};
  background-color: ${props =>
    props.isDisabled
      ? ({ theme }) => theme.color.background3
      : ({ theme }) => theme.color.coral};
  border: none;
  padding: 10px;

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
