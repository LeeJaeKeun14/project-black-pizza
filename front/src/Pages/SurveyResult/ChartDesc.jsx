import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import styled from "styled-components";
import ResultChart from "../../Components/Chart/ResultChart";
import { ottURL } from "../../utils/utils";

const ChartDesc = ({ ottData }) => {
  const [ott, setOtt] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setOtt(Object.entries(ottData).sort((a, b) => b[1] - a[1]));
    setTotal(Object.values(ottData).reduce((acc, e) => (acc += e), 0));
  }, [ottData]);
  useEffect(() => {
    console.log(ott);
    console.log(total);
  }, [ott, total]);
  if (ott.length === 0) return <Navigate to="/" />;
  return (
    <ChartBlock>
      <ResultChart data={ottData} />
      <Desc>
        <Title>
          회원님에게 <br />
          추천하는 OTT 서비스는 <br />
          <a href={ottURL[ott[0][0]]} target="_blank" rel="noreferrer">
            {ott[0][0]}
          </a>
          입니다.
        </Title>
        <AllOtt>
          {ott
            .filter(e => e[1] !== 0)
            .map((e, i) => (
              <OttWrap key={i} size={ott.length - i}>
                <Name>
                  <a href={ottURL[e[0]]} target="_blank" rel="noreferrer">
                    {e[0]}
                  </a>
                </Name>
                <Percnet>{`${Math.ceil((e[1] / total) * 100)}%`}</Percnet>
              </OttWrap>
            ))}
        </AllOtt>
      </Desc>
    </ChartBlock>
  );
};
const ChartBlock = styled.section`
  display: flex;
  justify-content: space-around;
`;
const Desc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.h3`
  ${({ theme }) => theme.font.large};
  padding-bottom: 20px;
  text-align: end;
  > a {
    color: ${({ theme }) => theme.color.coral};
    cursor: pointer;
    text-decoration: none;
  }
`;
const AllOtt = styled.div`
  text-align: start;
`;
const OttWrap = styled.div`
  ${({ theme }) => theme.font.small}
  font-size:${props => {
    if (props.size < 3) {
      return 3 * 0.5;
    }
    return props.size * 0.4;
  }}rem;
`;
const Name = styled.span`
  font-weight: bold;
  margin-right: 10px;
  > a {
    color: #f4ebc1;
    cursor: pointer;
    text-decoration: none;
  }
`;
const Percnet = styled.span`
  ${({ theme }) => theme.font.xsmall}
`;

export default ChartDesc;
