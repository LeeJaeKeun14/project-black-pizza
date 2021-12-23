import React from "react";
import { useMemo } from "react";
import styled, { keyframes } from "styled-components";

const ProgressBar = ({ selectedCount, totalCount }) => {
  const progress = useMemo(() => {
    if (selectedCount > 0) {
      return Math.ceil((selectedCount / totalCount) * 100);
    } else return 0;
  }, [selectedCount, totalCount]);
  return (
    <SProgressBarBlock>
      <SProgressText progress={progress}>{progress}%</SProgressText>
      <SProgressBorder />
      <SProgressBar progress={progress} total={totalCount} />
    </SProgressBarBlock>
  );
};

const SProgressBarBlock = styled.div`
  position: relative;
  width: 100%;
  padding: 10px 0;
`;
const SProgressText = styled.div`
  position: absolute;
  right: 48%;
  bottom: 30%;
  // color: ${props => (props.progress < 50 ? "black" : "white")};
`;
const SProgressBorder = styled.div`
  position: absolute;
  border: 1px solid white;
  left: 0;
  right: 0;
  height: 26px;
  border-radius: 10px;
`;
const SProgressBar = styled.div`
  width: ${props => (props.progress > 0 ? props.progress : 1)}%;
  height: 26px;
  background-color: #7d7dcd90;
  border-radius: 10px;
  animation: ${props => animate(props.progress, props.total)} 0.5s ease-out;
`;

const animate = (progress, total) => keyframes`
  from{
    width:${progress - Math.ceil(100 / total)}%;
  }
  to{
    width:${progress}%;
  }
`;

export default ProgressBar;
