import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";

const ToggleButton = ({ onClickCategory, text, selectedCategory }) => {
  const [isToggle, setIstoggle] = useState(false);

  useEffect(() => {
    if (selectedCategory.includes(text)) setIstoggle(true);
    else setIstoggle(false);
  }, [isToggle, selectedCategory, text]);
  const onClickHandler = () => {
    onClickCategory(text);
    setIstoggle(!isToggle);
  };
  return (
    <Button onClick={onClickHandler} isToggle={isToggle}>
      {text}
    </Button>
  );
};

const Button = styled.button`
  width: 20%;
  height: 100px;
  margin: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  color: ${({ theme }) => theme.color.font};
  background-color: ${props =>
    props.isToggle
      ? ({ theme }) => theme.color.coral
      : ({ theme }) => theme.color.background2};
  &:hover {
    background-color: ${props =>
      props.isToggle
        ? ({ theme }) => theme.color.coral
        : ({ theme }) => theme.color.background3};
  }
  ${media.mobile} {
    width: 33%;
  }
`;
export default ToggleButton;
