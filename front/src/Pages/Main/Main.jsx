import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import ContentDetail from "./ContentDetail";
import ContentItem from "./ContentItem";

const Main = props => {
  const [searchWord, setSearchWord] = useState("");
  const [selectContent, setSelectContent] = useState(null);
  const [hoveringContent, setHoveringContent] = useState(null);
  const fetchfavoriteList = async () => {
    const { data } = await axios.get("/api/contents/favorite").then(res => {
      return res;
    });
    console.log(data);
    return data;
  };
  const fetchUserPick = async () => {
    const { data } = await axios.get("/api/contents/userpick").then(res => {
      return res;
    });
    console.log(data);
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
  const fetchContentDetail = async id => {
    console.log(id);
    const { data } = await axios(`/api/contents/detail/${id}`).then(res => {
      console.log(res);
      return res;
    });
    return data;
  };
  const favoriteList = useQuery("favoriteList", fetchfavoriteList);
  // const userPick = useQuery("userPick", fetchUserPick);

  const searchResult = useQuery(
    ["search", searchWord],
    () => fetchSearchItem(searchWord),
    {
      enabled: false,
    }
  );

  const contentDetail = useQuery(
    ["contentDetail", selectContent],
    () => fetchContentDetail(selectContent),
    {
      enabled: false,
    }
  );

  const onSearch = async () => {
    searchResult.refetch();
  };

  const onMouseEnter = key => {
    setHoveringContent(key);
    setSelectContent(key);
  };
  const onMouseLeave = () => {
    setHoveringContent(null);
  };
  const onSelectItem = key => {
    console.log(key);
    contentDetail.refetch();
  };

  return (
    <MainBlock>
      <Header />
      <BodyWrap>
        <DetailBlock>
          {contentDetail.data ? (
            <ContentDetail data={contentDetail.data} />
          ) : (
            <LinkWrap>
              <Link to="/survey">survey</Link>
            </LinkWrap>
          )}
        </DetailBlock>
        <ContentListBlock>
          <List>
            <Wrap>
              {searchResult.data ? (
                searchResult.isLoading && searchResult.isLoading ? (
                  <div>loading...</div>
                ) : (
                  searchResult.data &&
                  searchResult.data.contents.map((e, i) => (
                    <ContentItem
                      key={i}
                      data={e}
                      hoveringContent={hoveringContent}
                      selectContent={selectContent}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      onSelectItem={onSelectItem}
                    />
                  ))
                )
              ) : favoriteList.isLoading && favoriteList.isLoading ? (
                <div>loading...</div>
              ) : (
                favoriteList.data.map((e, i) => (
                  <ContentItem
                    key={i}
                    data={e}
                    hoveringContent={hoveringContent}
                    selectContent={selectContent}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onSelectItem={onSelectItem}
                  />
                ))
              )}
            </Wrap>
          </List>
        </ContentListBlock>
      </BodyWrap>
      {/* <div>인기 영화</div>
      {favoriteList.isLoading && favoriteList.isLoading ? (
        <div>loading...</div>
      ) : (
        favoriteList.data.map((e, i) => (
          <img key={i} src={e.info[1]} alt="poster" />
        ))
      )} */}
      {/* <div>찜한 목록</div>
      {userPick.isLoading && userPick.isLoading ? (
        <div>loading...</div>
      ) : userPick.data.length === 0 ? (
        <div>찜한 목록이 없습니다.</div>
      ) : (
        userPick.data.map((e, i) => (
          <img key={i} src={e.info[1]} alt="poster" />
        ))
      )} */}
      <Tap>
        <div>
          <input
            type="text"
            onChange={e => {
              e.preventDefault();
              setSearchWord(e.target.value);
            }}
          />
          <button onClick={onSearch}>검색</button>
        </div>
      </Tap>
    </MainBlock>
  );
};
const MainBlock = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 1024px;
`;
const BodyWrap = styled.div`
  height: 100%;
  margin-top: -80px;
`;
const LinkWrap = styled.div`
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(0, -50%);

  > a {
    color: ${({ theme }) => theme.color.font};
    text-decoration: none;
  }
`;
const Tap = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0);
`;
const DetailBlock = styled.section`
  height: 50%;
  position: relative;
  // z-index: -100;
`;
const ContentListBlock = styled.section`
  height: 50%;
  width: 100%;
  overflow: scroll;
  padding-top: 50px;
  box-sizing: border-box;
  position: relative;
`;

const Wrap = styled.div`
  position: relative;
  white-space: nowrap;
  padding-right: 4%;
  padding-left: 4%;
  overflow-x: visible;
`;
const List = styled.ul`
  position: relative;
  // display: flex;
  // flex-direction: row;
  // padding: 0 50px;
  vertical-align: middle;
}
`;
const ImageBlock = styled.li`
  border-radius: 10px;
  margin: 20px;
  width: 25%;
  position: relative;
  display: inline-block;
  & + & {
    // margin: 20px 20px 20px 0;
  }
  // transition: transform 0.2s;
  &:hover {
    // border: 1px solid white;
    // width: 30%;
    // transform: scale(1.2);
  }
`;
const Image = styled.img`
  width: 100%;
  border-radius: 10px;
  display: block;
`;
export default Main;
