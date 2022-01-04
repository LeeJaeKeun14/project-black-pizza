import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { useUserPick } from "../../hooks/userPick";
import ContentItem from "./ContentItem";

const MyPage = props => {
  const userPick = useUserPick();

  return (
    <MyPageBlock>
      <Header />
      <Title>찜한 콘텐츠</Title>
      {userPick.isLoading ? (
        <div>loading...</div>
      ) : userPick.data.length === 0 ? (
        <div>찜한 목록이 없습니다.</div>
      ) : (
        <List>
          {userPick.data.map((e, i) => (
            <ContentItem key={i} data={e} />
          ))}
        </List>
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
`;
const List = styled.ul`
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
`;
export default MyPage;
