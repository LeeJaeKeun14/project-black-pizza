import React from "react";
import styled from "styled-components";

const Section4 = props => (
  <Part>
    <Text>
      <p>언택트(Untact) 시대가 가져온</p>
      <p>미디어 콘텐츠</p>
      <p>이용 방식의 변화</p>
      <Sub>언제 어디서나 원하는 컨텐츠를 즐길 수 있는</Sub>
      <Sub>OTT(Over The Top 온라인 동영상 서비스)의 성장</Sub>
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
    background: url(/images/description/4.jpg) no-repeat;
    background-size: cover;
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
const Sub = styled.p`
  font-size: 3rem;
  font-weight: 400;
`;
export default Section4;
