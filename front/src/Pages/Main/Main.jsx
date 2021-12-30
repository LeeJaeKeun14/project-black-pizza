import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header/Header";

const Main = props => {
  const [searchWord, setSearchWord] = useState("");
  const fetchfavoriteList = async () => {
    const { data } = await axios.get("/api/contents/favorite").then(res => {
      return res;
    });
    return data;
  };
  const fetchUserPick = async () => {
    const { data } = await axios.get("/api/contents/userpick").then(res => {
      return res;
    });
    return data;
  };
  const fetchSearchItem = async searchWord => {
    const { data } = await axios
      .get(`/api/contents/search?q=${searchWord}&type=title`)
      .then(res => {
        console.log(res);
        return res;
      });
    return data;
  };
  const favoriteList = useQuery("favoriteList", fetchfavoriteList);
  const userPick = useQuery("userPick", fetchUserPick);
  const searchResult = useQuery(
    ["search", searchWord],
    () => fetchSearchItem(searchWord),
    {
      enabled: false,
    }
  );

  const onSearch = async () => {
    searchResult.refetch();
  };
  useEffect(() => {}, [searchResult.data]);
  return (
    <div>
      <Header />
      <LinkWrap>
        <Link to="/survey">survey</Link>
      </LinkWrap>
      <div>인기 영화</div>
      {favoriteList.isLoading && favoriteList.isLoading ? (
        <div>loading...</div>
      ) : (
        favoriteList.data.map((e, i) => (
          <img key={i} src={e.info[1]} alt="poster" />
        ))
      )}
      <div>찜한 목록</div>
      {userPick.isLoading && userPick.isLoading ? (
        <div>loading...</div>
      ) : userPick.data.length === 0 ? (
        <div>찜한 목록이 없습니다.</div>
      ) : (
        userPick.data.map((e, i) => (
          <img key={i} src={e.info[1]} alt="poster" />
        ))
      )}
      <div>
        {searchResult.isLoading && searchResult.isLoading ? (
          <div>loading...</div>
        ) : (
          searchResult.data &&
          searchResult.data.contents.map((e, i) => (
            <img key={i} src={e.info[1]} alt="poster" />
          ))
        )}
        <input
          type="text"
          onChange={e => {
            e.preventDefault();
            setSearchWord(e.target.value);
          }}
        />
        <button onClick={onSearch}>검색</button>
      </div>
    </div>
  );
};
const LinkWrap = styled.div`
  > a {
    color: ${({ theme }) => theme.color.font};
    text-decoration: none;
  }
`;

export default Main;
