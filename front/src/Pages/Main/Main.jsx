import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import DetailModal from "../../Components/DetailModal/DetailModal";
import Header from "../../Components/Header/Header";
import { useFavoriteList, useSearchResult } from "../../hooks/useContent";
import { detailModalState } from "../../store/atoms";
import { media } from "../../styles/theme";
import Banner from "./Banner";
import ContentItem from "./ContentItem";
import Tap from "./Tap";

const Main = props => {
  const [searchWord, setSearchWord] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [selectContent, setSelectContent] = useState(null);
  const [hoveringContent, setHoveringContent] = useState(null);
  const [detailState, setDetailModalState] = useRecoilState(detailModalState);
  const favoriteList = useFavoriteList();
  const searchResult = useSearchResult(searchWord, searchType);

  useEffect(() => {
    return setDetailModalState(null);
  }, []);

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
    setDetailModalState(key);
  };

  return (
    <MainBlock>
      <Header />
      <BodyWrap>
        <DetailBlock>
          <Banner />
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
        />
      </BodyWrap>
      {detailState && <DetailModal id={detailState} />}
    </MainBlock>
  );
};
const MainBlock = styled.div`
  height: 100%;
  margin: 0 auto;
  position: relative;
  ${media.tablet} {
    max-width: 1024px;
  }
`;
const BodyWrap = styled.div`
  height: 100%;
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
  // height: 50%;
  width: 100%;
  box-sizing: border-box;
  padding: 50px 0;
`;
const ListTitle = styled.h2`
  // padding-top: 50px;
  width: 80%;
  margin: 0 auto;
  ${({ theme }) => theme.font.medium};
`;
const Wrap = styled.div`
  position: relative;
  white-space: nowrap;
  overflow-x: scroll;
  width: 80%;
  margin: 0 auto;
  &::-webkit-scrollbar {
    height: 10px;
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.background3};
    opacity: 0.4;
    border-radius: 30px;
  }
`;
const List = styled.ul`
  position: relative;
  vertical-align: middle;
  padding:20px 0;
}
`;
export default Main;
