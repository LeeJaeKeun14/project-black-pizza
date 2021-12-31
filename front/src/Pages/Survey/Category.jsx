import React, { useEffect, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { userSelectedGenres, userSelectedYears } from "../../store/atoms";
import ToggleButton from "./ToggleButton";
const Category = props => {
  const [userGenres, setUserGenres] = useRecoilState(userSelectedGenres);
  const [userYears, setUserYears] = useRecoilState(userSelectedYears);
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
    <div>
      <ProgressBar selectedCount={selectedCount} totalCount={2} />

      <GenreWrap>
        <p>어떤 장르의 콘텐츠를 보고 싶은가요?</p>
        <ButtonsWrap>
          {["로맨스", "공포", "가족", "코미디", "액션", "애니메이션"].map(
            (e, i) => (
              <ToggleButton key={i} onClickCategoty={onClickGenre} text={e} />
            )
          )}
        </ButtonsWrap>
      </GenreWrap>
      <GenreWrap>
        <p>어느 연도의 콘텐츠를 보고 싶은가요?</p>
        <ButtonsWrap>
          {[1970, 1980, 1990, 2000, 2010, 2020].map((e, i) => (
            <ToggleButton key={i} onClickCategoty={onClickYear} text={e} />
          ))}
        </ButtonsWrap>
      </GenreWrap>
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
const Button = styled.button`
  width: 20%;
  height: 100px;
  margin: 10px;
  box-sizing: border-box;
  // & + & {
  //   margin-right: 10px;
  // }
`;

export default Category;
