import React from "react";
import Chart from "./Chart";
import styled from "styled-components";
import { media } from "../../styles/theme";
import { increase } from "../../utils/chartData";

const Section3 = props => (
  <Part>
    <Wrap>
      <Title>서울특별시 코로나19 확진자 증가 추이(2020.1~2021.11)</Title>
      <Chart inputData={increase} type={"increase"} />
    </Wrap>
    <Wrap>
      <img src="/images/covid.gif" alt="covid" />
    </Wrap>
  </Part>
);

export default Section3;

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
    background: url(/images/description/1.jpg) no-repeat;
    background-size: cover;
    z-index: -1;
  }
  ${media.tablet} {
    flex-direction: column;
    margin: 0 auto;
  }
`;
const Wrap = styled.div`
  width: 50%;
  display: flex;
  padding: 80px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  ${media.tablet} {
    margin: 0 auto;
    width: 100%;
  }
  ${media.mobile} {
    width: 100%;
    padding: 10px;
  }
`;
const Title = styled.h2`
  ${({ theme }) => theme.font.large}
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  text-align: center;
  ${media.tablet} {
    font-size: 1rem;
  }
`;
