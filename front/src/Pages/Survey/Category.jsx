import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { userSelectedGenres, userSelectedYears } from "../../store/atoms";
import { contentGenreCategory, contentYearCategory } from "../../utils/utils";
import CategoryQuetion from "./CategoryQuetion";
import ToggleButton from "./ToggleButton";
const Category = props => {
  const [userGenres, setUserGenres] = useRecoilState(userSelectedGenres);
  const [userYears, setUserYears] = useRecoilState(userSelectedYears);
  const [goNext, setGoNext] = useState(false);
  const selectedCount = useMemo(() => {
    if (userGenres.length === 0 && userYears.length === 0) return 0;
    else if (userGenres.length === 0 || userYears.length === 0) return 1;
    else return 2;
  }, [userGenres, userYears]);

  useEffect(() => {
    console.log(userGenres);
    console.log(userYears);
  }, [userGenres, userYears]);

  useEffect(() => {
    setUserGenres([]);
    setUserYears([]);
  }, [setUserGenres, setUserYears]);
  const [currentStep, setCurrentStep] = useState(1);
  const onClickGenre = genre => {
    setUserGenres(cur => {
      if (cur.includes(genre)) return [...cur.filter(e => e !== genre)];
      else return [...cur, genre];
    });
  };
  const onClickYear = year => {
    setUserYears(cur => {
      if (cur.includes(year)) return [...cur.filter(e => e !== year)];
      else return [...cur, year];
    });
  };
  const renderList = useMemo(() => {
    if (currentStep === 1) return contentGenreCategory;
    else return contentYearCategory;
  }, [currentStep]);

  return (
    <div>
      <ProgressBar selectedCount={selectedCount} totalCount={2} />

      {goNext ? (
        <GenreWrap>
          <Question>어느 연도의 콘텐츠를 보고 싶은가요?</Question>
          <ButtonsWrap>
            {contentYearCategory.map((e, i) => (
              <ToggleButton
                key={i}
                onClickCategory={onClickYear}
                text={e}
                selectedCategory={userYears}
              />
            ))}
          </ButtonsWrap>
        </GenreWrap>
      ) : (
        <GenreWrap>
          <Question>어떤 장르의 콘텐츠를 보고 싶은가요?</Question>
          <ButtonsWrap>
            {contentGenreCategory.map((e, i) => (
              <ToggleButton
                key={i}
                onClickCategory={onClickGenre}
                text={e}
                selectedCategory={userGenres}
              />
            ))}
          </ButtonsWrap>
        </GenreWrap>
      )}
      <Button
        disabled={userGenres.length === 0}
        isDisplay={goNext}
        onClick={() => {
          setGoNext(true);
          setCurrentStep(2);
        }}
      >
        다음 질문
      </Button>
    </div>
  );
};
const GenreWrap = styled.div`
  text-align: center;
`;
const ButtonsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Question = styled.p`
  padding: 30px 0;
`;
const Button = styled.button`
  margin: 0 auto;
  display: ${props => (props.isDisplay ? "none" : "flex")};
  justify-content: center;
  color: ${({ theme }) => theme.color.font};
  background-color: ${props =>
    props.disabled
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

export default Category;
