import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  useContentDetail,
  useFavoriteList,
  useSearchResult,
} from "../../api/content";
import Header from "../../Components/Header/Header";
import { media } from "../../styles/theme";
import Banner from "./Banner";
import ContentDetail from "./ContentDetail";
import ContentItem from "./ContentItem";
import Tap from "./Tap";

const Main = props => {
  const [searchWord, setSearchWord] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [selectContent, setSelectContent] = useState(null);
  const [hoveringContent, setHoveringContent] = useState(null);
  const [viewContent, setViewContent] = useState(null);
  const favoriteList = useFavoriteList();
  const contentDetail = useContentDetail(viewContent);
  const searchResult = useSearchResult(searchWord, searchType);

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
            <Banner />
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
                    ranking={i + 1}
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
          setSearchType={setSearchType}
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
  //
  position: relative;
  ${media.tablet} {
    max-width: 1024px;
  }
`;
const BodyWrap = styled.div`
  height: 100%;
  // margin-top: -80px;
  // transform: translate(0, -80px);
`;
const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.font};
  text-decoration: none;
  ${({ theme }) => theme.font.small};
  // padding: 0 6px;
  // display: ${props => (props.location === "true" ? "none" : "block")};
`;
// const Banner = styled.div`
//   width: 80%;
//   margin: 0 auto;
//   height: 100%;
// `;
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
const DetailBlock = styled.section`
  height: 50%;
  position: relative;

  background: ${props =>
    props.contentToView
      ? "linear-gradient(217deg, #e96d71, rgba(255, 0, 0, 0) 70.71%),linear-gradient(127deg, #ffd26f, rgba(0, 255, 0, 0) 70.71%),linear-gradient(336deg, rgb(54 119 255), rgba(0, 0, 255, 0) 70.71%)"
      : ""};
  overflow: hidden;
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
  // padding-left: 4%;
  width: 80%;
  margin: 0 auto;
  ${({ theme }) => theme.font.medium};
`;
const Wrap = styled.div`
  position: relative;
  white-space: nowrap;
  // padding-right: 4%;
  // padding-left: 4%;
  overflow-x: visible;
  overflow: scroll;
  width: 80%;
  margin: 0 auto;
`;
const List = styled.ul`
  position: relative;
  vertical-align: middle;
  // padding-top: 50px;
  padding:20px 0;
}
`;
export default Main;
