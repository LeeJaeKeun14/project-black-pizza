import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import ContentDetail from "./ContentDetail";
import ContentItem from "./ContentItem";
import Tap from "./Tap";

const Main = props => {
  const [searchWord, setSearchWord] = useState("");
  const [selectContent, setSelectContent] = useState(null);
  const [hoveringContent, setHoveringContent] = useState(null);
  const [viewContent, setViewContent] = useState(null);
  const fetchfavoriteList = async () => {
    const { data } = await axios.get("/api/contents/favorite").then(res => {
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

  const searchResult = useQuery(
    ["search", searchWord],
    () => fetchSearchItem(searchWord),
    {
      enabled: false,
    }
  );

  const contentDetail = useQuery(
    ["contentDetail", viewContent],
    () => fetchContentDetail(viewContent),
    {
      enabled: !!viewContent,
      keepPreviousData: true,
    }
  );

  const onSearch = async () => {
    searchResult.refetch();
  };

  const onMouseEnter = key => {
    setHoveringContent(key);
  };
  const onMouseLeave = () => {
    setHoveringContent(null);
    setSelectContent(null);
  };
  const onSelectItem = key => {
    setViewContent(key);
  };

  return (
    <MainBlock>
      <Header />
      <BodyWrap>
        <DetailBlock contentToView={contentDetail.data}>
          {contentDetail.data ? (
            contentDetail.isLoading ? (
              <div>loading...</div>
            ) : (
              <ContentDetail data={contentDetail.data} />
            )
          ) : (
            <LinkWrap>
              <Link to="/survey">survey</Link>
            </LinkWrap>
          )}
        </DetailBlock>
        <ContentListBlock>
          <ListTitle>{searchResult.data ? "검색결과" : "인기영화"}</ListTitle>
          <Wrap>
            <List>
              {searchResult.data ? (
                searchResult.isLoading ? (
                  <div>loading...</div>
                ) : searchResult.data.contents.length > 0 ? (
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
                ) : (
                  <div>검색결과가 없습니다.</div>
                )
              ) : favoriteList.isLoading ? (
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
            </List>
          </Wrap>
        </ContentListBlock>
        <Tap
          onSearch={onSearch}
          setSearchWord={setSearchWord}
          setSelectContent={setSelectContent}
          setHoveringContent={setHoveringContent}
          setViewContent={setViewContent}
        />
      </BodyWrap>
    </MainBlock>
  );
};
const MainBlock = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 1024px;
  position: relative;
`;
const BodyWrap = styled.div`
  height: 100%;
  // margin-top: -80px;
  // transform: translate(0, -80px);
`;
const LinkWrap = styled.div`
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);

  > a {
    color: ${({ theme }) => theme.color.font};
    text-decoration: none;
  }
`;
// const Tap = styled.div`
//   position: absolute;
//   top: 80px;
//   left: 50%;
//   transform: translate(-50%, 0);
// `;
const DetailBlock = styled.section`
  height: 50%;
  position: relative;

  background: ${props =>
    props.contentToView
      ? "linear-gradient(217deg, #e96d71, rgba(255, 0, 0, 0) 70.71%),linear-gradient(127deg, #ffd26f, rgba(0, 255, 0, 0) 70.71%),linear-gradient(336deg, rgb(54 119 255), rgba(0, 0, 255, 0) 70.71%)"
      : ""};
`;
const ContentListBlock = styled.section`
  height: 50%;
  width: 100%;
  // overflow: scroll;
  // padding-top: 50px;
  box-sizing: border-box;
`;
const ListTitle = styled.h2`
  padding-top: 50px;
  padding-left: 4%;

  ${({ theme }) => theme.font.medium};
`;
const Wrap = styled.div`
  position: relative;
  white-space: nowrap;
  padding-right: 4%;
  padding-left: 4%;
  overflow-x: visible;
  overflow: scroll;
`;
const List = styled.ul`
  position: relative;
  vertical-align: middle;
  // padding-top: 50px;
  padding:20px 0;
}
`;
export default Main;
