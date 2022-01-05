import React from "react";
import styled from "styled-components";
const Section6 = props => (
  <Part>
    <Text>
      <p>다양해진 OTT 플랫폼 사이에서</p>
      <p>나에게 딱 맞는 플랫폼은</p>
      <p>어떻게 찾을까?</p>
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

export default Section6;
