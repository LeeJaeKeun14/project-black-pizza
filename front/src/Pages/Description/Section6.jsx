import React from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";
const Section6 = props => (
  <Part>
    <Text>
      <p>다양해진 OTT 플랫폼 사이에서</p>
      <p>
        <Point>나에게 딱 맞는 플랫폼</Point>은
      </p>
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
  background-color: #000000c0;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: url(/images/description/배경사진_ott플랫폼.jfif) no-repeat;
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
const Point = styled.span`
  color: ${({ theme }) => theme.color.coral};
`;
export default Section6;
