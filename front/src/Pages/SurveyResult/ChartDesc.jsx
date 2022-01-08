import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import styled from "styled-components";
import ResultChart from "../../Components/Chart/ResultChart";
import { media } from "../../styles/theme";
import { chartColor } from "../../utils/chartData";
import { ottURL } from "../../utils/utils";

const ChartDesc = ({ ottData }) => {
  const [ott, setOtt] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setOtt(Object.entries(ottData).sort((a, b) => b[1] - a[1]));
    setTotal(Object.values(ottData).reduce((acc, e) => (acc += e), 0));
  }, [ottData]);
  if (Object.values(ottData).length === 0) return <Navigate to="/" />;
  return (
    <ChartBlock>
      <ResultChart data={ottData} />
      {ott.length === 0 ? (
        <div>loading...</div>
      ) : (
        <Desc>
          <Title>
            회원님에게 <br />
            추천하는 OTT 서비스는 <br />
            <a
              href={ott[0][0] && ottURL[ott[0][0]]}
              target="_blank"
              rel="noreferrer"
            >
              {ott[0][0] && ott[0][0]}
            </a>
            입니다.
          </Title>
          <AllOtt>
            {ott.length !== 0 &&
              ott
                .filter(e => e[1] !== 0)
                .map((e, i) => (
                  <OttWrap key={i} size={ott.length - i}>
                    <Name numbering={i}>
                      <a href={ottURL[e[0]]} target="_blank" rel="noreferrer">
                        {e[0]}
                      </a>
                    </Name>
                    <Percentage>{`${Math.ceil(
                      (e[1] / total) * 100
                    )}%`}</Percentage>
                  </OttWrap>
                ))}
          </AllOtt>
        </Desc>
      )}
    </ChartBlock>
  );
};
const ChartBlock = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  ${media.tablet} {
    padding: 0 50px;
  }
  ${media.mobile} {
    flex-direction: column;
  }
`;
const Desc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${media.mobile} {
    padding-top: 50px;
  }
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
  ${media.mobile} {
    text-align: center;
  }
`;
const AllOtt = styled.div`
  text-align: start;
  ${media.mobile} {
    text-align: center;
  }
`;
const OttWrap = styled.div`
  ${({ theme }) => theme.font.small}
  font-size:${props => {
    if (props.size < 3) {
      return 3 * 0.4;
    }
    return props.size * 0.4;
  }}rem;
`;
const Name = styled.span`
  font-weight: bold;
  margin-right: 10px;
  > a {
    color: ${props => chartColor[props.numbering]};
    cursor: pointer;
    text-decoration: none;
  }
`;
const Percentage = styled.span`
  ${({ theme }) => theme.font.xsmall}
`;

export default ChartDesc;
