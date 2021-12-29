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
  justify-content: space-between;
  > label {
    line-height: 40px;
    display: flex;
    margin-left: 12px;
    font-size: 14px;
  }
  > input {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 4px 16px;
    border: none;
    border-radius: 10px;
    outline: none;
    background-color: ${({ theme }) => theme.color.background3};
    color: ${({ theme }) => theme.color.font};
  }
`;
const Label = styled.label``;
export default Input;
