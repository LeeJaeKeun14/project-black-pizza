import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ToggleButton = ({ onClickCategoty, text }) => {
  const [isToggle, setIstoggle] = useState(false);
  useEffect(() => {
    console.log(isToggle);
  }, [isToggle]);
  const onClickHandler = () => {
    onClickCategoty(text);
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
  background-color: ${props => (props.isToggle ? "skyblue" : "coral")};
  // & + & {
  //   margin-right: 10px;
  // }
`;
export default ToggleButton;
