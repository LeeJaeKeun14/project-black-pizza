import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { useUserPick } from "../../hooks/useUserPick";
import ContentItem from "./ContentItem";
import { useResultPost } from "../../hooks/useResult";
import { useSetRecoilState } from "recoil";
import { recommendResult } from "../../store/atoms";
const MyPage = props => {
  const navigator = useNavigate();
  const userPick = useUserPick();
  const surveyResult = useResultPost();
  const setRecommendResult = useSetRecoilState(recommendResult);
  const formatForRecommend = () => {
    return userPick.data.map(e => {
      return { contents_id: e.key, score: 0, is_picked: true };
    });
  };

  const getRecommend = () => {
    setRecommendResult([]);
    surveyResult.mutate(formatForRecommend());
    navigator("/result");
  };
  return (
    <MyPageBlock>
      <Header />

      <Title>찜한 콘텐츠</Title>

      {userPick.isLoading ? (
        <div>loading...</div>
      ) : userPick.data.length === 0 ? (
        <div>찜한 목록이 없습니다.</div>
      ) : (
        <div>
          <Button onClick={getRecommend}>찜한 목록으로 추천받기</Button>
          <List>
            {userPick.data.map((e, i) => (
              <ContentItem key={i} data={e} />
            ))}
          </List>
        </div>
      )}
    </MyPageBlock>
  );
};

const MyPageBlock = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`;
const Title = styled.div`
  text-align: center;
  padding-bottom: 30px;
`;
const List = styled.ul`
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;
const Button = styled.button`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.color.font};
  background-color: ${({ theme }) => theme.color.coral};
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.color.background3};
  }
`;
export default MyPage;
