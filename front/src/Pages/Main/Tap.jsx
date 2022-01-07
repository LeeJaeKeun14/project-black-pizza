import React, { useCallback, useRef, useState } from "react";

import styled from "styled-components";
import { media } from "../../styles/theme";

const Tap = ({
  setSearchWord,
  setSearchType,
  onSearch,
  setHoveringContent,
  setSelectContent,
  setViewContent,
}) => {
  const inputRef = useRef("");
  const [isDisplay, setIsDisplay] = useState(false);
  const [isDisplaySearchType, setIsDIsplaySearchType] = useState(false);
  const [selectedType, setSeletedType] = useState("title");
  const setMainPage = () => {
    setSearchWord("");
    setHoveringContent(null);
    setSelectContent(null);
    setViewContent(null);
    inputRef.current.value = "";
  };
  const onClickSearchButton = () => {
    onSearch();
  };
  const handleChangeWord = useCallback(
    e => {
      setSearchWord(e.target.value);
    },
    [setSearchWord]
  );
  const handleSearchTypeToggle = () => {
    setIsDIsplaySearchType(cur => !cur);
  };
  const handlerSearchType = e => {
    const type = e.target.dataset.type;

    setSearchType(type);
    setSeletedType(type);
  };

  return (
    <TapBlock>
      <Button onClick={setMainPage}>홈</Button>
      <Button onClick={() => setIsDisplay(cur => !cur)}>검색</Button>
      <SearchBarBlock isDisplay={isDisplay}>
        <InputBlock>
          <SearchTypeToggle onClick={handleSearchTypeToggle}>
            ▼
          </SearchTypeToggle>
          <SearchTypeCarousel isDisplaySearchType={isDisplaySearchType}>
            <CarouselItem
              onClick={handlerSearchType}
              selectedType={selectedType}
              data-type={"title"}
            >
              제목
            </CarouselItem>
            <CarouselItem
              onClick={handlerSearchType}
              selectedType={selectedType}
              data-type={"director"}
            >
              감독
            </CarouselItem>
            <CarouselItem
              onClick={handlerSearchType}
              selectedType={selectedType}
              data-type={"actor"}
            >
              배우
            </CarouselItem>
          </SearchTypeCarousel>
          <Input ref={inputRef} type="text" onChange={handleChangeWord} />
        </InputBlock>

        <Button onClick={onClickSearchButton}>찾기</Button>
      </SearchBarBlock>
    </TapBlock>
  );
};

const TapBlock = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;
const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.font};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.coral};
  }
  ${media.tablet} {
    background-color: ${({ theme }) => theme.color.font};
    color: ${({ theme }) => theme.color.background};
    border-radius: 5px;
    padding: 5px;
    margin-right: 5px;
  }
`;
const SearchBarBlock = styled.div`
  display: ${props => (props.isDisplay ? "flex" : "none")};
  transition: all 0.3s;
`;
const InputBlock = styled.div`
  position: relative;
`;
const Input = styled.input`
  box-sizing: border-box;
  padding: 4px 16px 4px 24px;
  border: 2px solid ${({ theme }) => theme.color.font};
  border-radius: 15px;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.color.font};
  ${media.tablet} {
    background-color: ${({ theme }) => theme.color.font};
    color: ${({ theme }) => theme.color.background};
    border-radius: 5px;
    margin-right: 5px;
  }
`;
const SearchTypeToggle = styled.button`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translate(0, -40%);
  background: none;
  border: none;
  color: #eee;
  padding: 0;
  cursor: pointer;
  ${media.tablet} {
    color: ${({ theme }) => theme.color.background};
  }
`;
const SearchTypeCarousel = styled.div`
  display: ${props => (props.isDisplaySearchType ? "block" : "none")};
  position: absolute;
  top: 0;
  transform: translate(0, 50%);
`;
const CarouselItem = styled.div`
  cursor: pointer;
  background-color: ${props =>
    props.selectedType === props["data-type"]
      ? ({ theme }) => theme.color.coral
      : "none"};

  padding: 2px 5px;
  border-radius: 5px;
`;
export default Tap;
