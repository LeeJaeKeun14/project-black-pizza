import React from "react";
import styled from "styled-components";

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
  background-color: #0000008c;

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
const Text = styled.h1`
  font-size: 6rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  text-align: center;
  color: #ffffff;
`;
const Sub = styled.p`
  font-size: 3rem;
  font-weight: 400;
`;
export default Section2;
