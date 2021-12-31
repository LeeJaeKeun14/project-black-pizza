import React, { memo, useRef, useState } from "react";
import styled from "styled-components";

const Tap = memo(
  ({ setSearchWord, onSearch, setHoveringContent, setSelectContent }) => {
    const inputRef = useRef("");
    const [isDisplay, setIsDisplay] = useState(false);
    const setMainPage = () => {
      setSearchWord("");
      setHoveringContent(null);
      setSelectContent(null);
      inputRef.current.value = "";
    };
    const onClickSearchButton = () => {
      // setSearchWord(inputRef.current.value);
      onSearch();
    };
    return (
      <TapBlock>
        <Button onClick={setMainPage}>main</Button>
        <Button onClick={() => setIsDisplay(!isDisplay)}>search</Button>
        <SearchBarBlock isDisplay={isDisplay}>
          <Input
            ref={inputRef}
            type="text"
            onChange={e => {
              e.preventDefault();
              setSearchWord(e.target.value);
            }}
          />
          <Button onClick={onClickSearchButton}>검색</Button>
        </SearchBarBlock>
      </TapBlock>
    );
  }
);

const TapBlock = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.font};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.coral};
  }
`;
const SearchBarBlock = styled.div`
  display: ${props => (props.isDisplay ? "block" : "none")};
  transition: all 0.3s;
`;
const Input = styled.input`
  box-sizing: border-box;
  padding: 4px 16px;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: ${({ theme }) => theme.color.background3};
  color: ${({ theme }) => theme.color.font};
`;
export default Tap;
