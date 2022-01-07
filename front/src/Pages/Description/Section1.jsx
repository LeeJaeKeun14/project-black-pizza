import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { media } from "../../styles/theme";

const Section1 = props => {
  const navigator = useNavigate();
  const goSurvey = () => {
    navigator("/survey");
  };
  return (
    <Part>
      <Text>
        <div>{`OTT 플랫폼 & 영화`}</div>
        <div>추천 웹 서비스</div>
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
  background-color: #000000c0;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: url(/images/description/1.jpg) no-repeat;
    background-size: cover;
    z-index: -1;
  }
`;
const Text = styled.h2`
  font-size: 4rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  ${media.tablet} {
    font-size: 3rem;
  }
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
  ${media.tablet} {
    font-size: 1rem;
  }
`;
export default Section1;
