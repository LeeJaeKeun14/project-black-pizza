import React from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { useResultPost } from "../../hooks/useResult";
import { ratingStateResult } from "../../store/atoms";
import List from "./List";

const RatingContent = props => {
  const ratingArr = useRecoilValue(ratingStateResult);
  const surveyResult = useResultPost();
  const navigator = useNavigate();
  const SELECT_COUNT = 5;

  const goResultPage = () => {
    if (ratingArr.length < SELECT_COUNT) {
      alert(`${SELECT_COUNT}개 이상의 콘텐츠를 평가하거나 찜해주세요`);
    } else {
      surveyResult.mutate(ratingArr);
      navigator("/result");
    }
  };

  return (
    <RatingBlock>
      <SelectNav>
        <ProgressBar
          selectedCount={ratingArr.length}
          totalCount={SELECT_COUNT}
        />
        <Button
          isDisabled={ratingArr.length < SELECT_COUNT}
          onClick={goResultPage}
        >
          추천 확인하기
        </Button>
        <Question>
          {SELECT_COUNT}개 이상의 콘텐츠를 평가하거나 찜해주세요
        </Question>
      </SelectNav>

      <Content>
        <List />
      </Content>
    </RatingBlock>
  );
};
const RatingBlock = styled.div`
  padding-bottom: 30px;
`;
const SelectNav = styled.div`
  position: sticky;
  top: 80px;
  z-index: 100;
  background-color: ${({ theme }) => theme.color.background};
}
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
  margin-top: 30px;
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

export default RatingContent;
