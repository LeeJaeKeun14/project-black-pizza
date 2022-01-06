import React from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";
import { movie, netflix } from "../../utils/chartData";
import Chart from "./Chart";

const Section5 = props => (
  <Part>
    <ChartWrap>
      <Title>국내 영화관 총 관객수</Title>
      <Sub>
        2020년 1월 대비
        <Point2> -99% 감소</Point2>
      </Sub>
      <Chart inputData={movie} type={"movie"} />
    </ChartWrap>
    <ChartWrap>
      <Title>넷플릭스 월 사용자 수 추이</Title>
      <Sub>
        2020년 1월 대비
        <Point1> 113% 증가</Point1>
      </Sub>
      <Chart inputData={netflix} type={"netflix"} />
    </ChartWrap>
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
    background: url(/images/description/1.jpg) no-repeat;
    background-size: cover;
    z-index: -1;
  }
  ${media.tablet} {
    flex-direction: column;
    margin: 0 auto;
  }
`;
const ChartWrap = styled.div`
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
const Sub = styled.p`
  ${({ theme }) => theme.font.medium}
  text-align: end;
  ${media.tablet} {
    font-size: 1rem;
  }
`;
const Point1 = styled.span`
  color: ${({ theme }) => theme.color.coral};
`;
const Point2 = styled.span`
  color: #4f60b8;
`;
export default Section5;
