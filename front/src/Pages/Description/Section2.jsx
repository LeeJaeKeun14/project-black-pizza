import React from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";

const Section2 = props => (
  <Part>
    <Text>
      <p>코로나 19 시대의</p>
      <p>장기화</p>
      <Sub>여전히 늘어나고 있는 확진자 수</Sub>
      <Sub>사라지지 않는 불안감</Sub>
    </Text>
  </Part>
);

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
    background: url(/images/description/배경사진_코로나.jfif) no-repeat;
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
  text-align: center;
  ${media.tablet} {
    font-size: 3rem;
  }
`;
const Sub = styled.p`
  font-size: 3rem;
  font-weight: 400;
  ${media.tablet} {
    font-size: 1rem;
  }
`;
export default Section2;
