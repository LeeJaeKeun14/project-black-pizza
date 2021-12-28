import React from "react";
import { useRef } from "react";
import { useState } from "react";

import styled from "styled-components";

const Input = ({ inputId, inputType, label, placeholder, onChangeHandler }) => {
  const [pointer, setPointer] = useState(false);
  const inputref = useRef();
  const onClickHandler = e => {
    console.log(e);
    console.log(inputref.current.value);
  };

  return (
    <InputBlock>
      <label htmlFor={inputId}>{label}</label>
      <input
        type={inputType}
        id={inputId}
        placeholder={placeholder}
        onChange={e => onChangeHandler(e.target.value)}
      />
    </InputBlock>
  );
};

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  // border: 1px solid black;
  box-shadow: 4px 4px 29px -14px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 10px 20px;
  // justify-content: space-between;
  > label {
    // line-height: 40px;
    // display: none;
    color: black;
    // font-weight: bold;
    height: 40px;
    line-height: 40px;
  }
  > input {
    width: 60%;
    height: 36px;
    // box-sizing: border-box;
    padding: 4px 0;
    border: none;
    // border: 2px solid ${({ theme }) => theme.color.point};
    // border-radius: 25px;
    outline: none;
    // background-color: ${({ theme }) => theme.color.background};
    // color: ${({ theme }) => theme.color.font};
  }
  & + & {
    margin-top: 16px;
  }
`;
const Label = styled.label``;
export default Input;
