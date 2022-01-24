import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { userSelectedGenres, userSelectedYears } from "../../store/atoms";
import { contentGenreCategory, contentYearCategory } from "../../utils/utils";
import ToggleButton from "./ToggleButton";
const Category = ({ setSelectAllCategory }) => {
  const [userGenres, setUserGenres] = useRecoilState(userSelectedGenres);
  const [userYears, setUserYears] = useRecoilState(userSelectedYears);
  // const [selectAllCategory, setSelectAllCategory] = useState(false);
  const [goNext, setGoNext] = useState(false);

  useEffect(() => {
    setUserGenres([]);
    setUserYears([]);
  }, [setUserGenres, setUserYears]);

  const selectedCount = useMemo(() => {
    if ([userGenres, userYears].every(e => e.length === 0)) return 0;
    else if ([userGenres, userYears].some(e => e.length === 0)) return 1;
    else return 2;
  }, [userGenres, userYears]);

  const goSelectYear = () => {
    if (userGenres.length === 0) {
      alert("하나 이상의 장르를 선택해주세요");
    } else {
      setGoNext(true);
      // setButtonState(1);
    }
  };

  const goRatingStep = () => {
    if (userGenres.length === 0 || userYears.length === 0) {
      alert("하나 이상의 연도를 모두 선택해주세요");
    } else {
      // setSelectAllCategory(!selectAllCategory);
      // setButtonState(2);
      setSelectAllCategory(cur => !cur);
    }
  };
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

  return (
    <CategoryBlock>
      <SelectNav>
        <ProgressBar selectedCount={selectedCount} totalCount={2} />
        {goNext ? (
          <div>
            <Button
              isDisabled={userGenres.length === 0 || userYears.length === 0}
              onClick={goRatingStep}
            >
              평가하기
            </Button>
            <Question>어느 연도의 콘텐츠를 보고 싶은가요?</Question>
          </div>
        ) : (
          <div>
            <Button isDisabled={userGenres.length === 0} onClick={goSelectYear}>
              다음 질문
            </Button>
            <Question>어떤 장르의 콘텐츠를 보고 싶은가요?</Question>
          </div>
        )}
      </SelectNav>

      {goNext ? (
        <GenreWrap>
          {/* <Button
            isDisabled={userGenres.length === 0 || userYears.length === 0}
            onClick={goRatingStep}
          >
            평가하기
          </Button> */}
          {/* <Question>어느 연도의 콘텐츠를 보고 싶은가요?</Question> */}
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
          {/* <Button isDisabled={userGenres.length === 0} onClick={goSelectYear}>
            다음 질문
          </Button> */}
          {/* <Question>어떤 장르의 콘텐츠를 보고 싶은가요?</Question> */}
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
      {/* <Button
        disabled={userGenres.length === 0}
        isDisplay={goNext}
        onClick={() => {
          setGoNext(true);
        }}
      >
        다음 질문
      </Button> */}
    </CategoryBlock>
  );
};
const CategoryBlock = styled.div`
  padding-bottom: 30px;
`;
const SelectNav = styled.div`
  position: sticky;
  top: 80px;
  background-color: ${({ theme }) => theme.color.background};
`;
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
  text-align: center;
`;
const Button = styled.button`
  margin: 0 auto;
  display: ${props => (props.isDisplay ? "none" : "flex")};
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

export default Category;
