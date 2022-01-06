import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Section7 = props => {
  const navigator = useNavigate();
  const goSurvey = () => {
    navigator("/survey");
  };
  return (
    <Part>
      <Text>
        <p>보고싶은 영화를 고르고</p>
        <p>
          <Point>나만의 맞춤 OTT와 영화</Point>를
        </p>
        <p>추천 받아 보자</p>
      </Text>
      <Button onClick={goSurvey}>OTT 추천 받기</Button>
    </Part>
  );
};

const Part = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;

  justify-content: center;
  background-color: #000000c0;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-image: url(/images/description/7-1.jpg),
      url(/images/description/7-2.png), url(/images/description/7-3.jpg);
    background-repeat: no-repeat;
    background-position: 0px 0px, 50% 0px, 100% 0px;
    background-size: 33% 100%, 34% 100%, 33% 100%;
    z-index: -1;
  }
`;
const Text = styled.h1`
  font-size: 6rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  text-align: center;
`;
const Button = styled.button`
  position: absolute;
  bottom: 100px;
  right: 50%;
  transform: translate(50%, 0);
  padding: 20px;
  ${({ theme }) => theme.font.large};
  color: ${({ theme }) => theme.color.font};
  background-color: ${({ theme }) => theme.color.background3};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.coral};
  }
`;
const Point = styled.span`
  color: ${({ theme }) => theme.color.coral};
`;
export default Section7;
