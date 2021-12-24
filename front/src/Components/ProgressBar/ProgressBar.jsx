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
    <ProgressBarBlock>
      <Text progress={progress}>{progress}%</Text>
      <Border>
        <Solid progress={progress} total={totalCount} />
      </Border>
    </ProgressBarBlock>
  );
};

const ProgressBarBlock = styled.div`
  position: relative;
  width: 50%;
  padding: 10px 0;
  margin: 0 auto;
`;
const Text = styled.div`
  text-align: center;
`;
const Border = styled.div`
  border: 1px solid white;
  height: 13px;
  border-radius: 10px;
`;
const Solid = styled.div`
  width: ${props => (props.progress > 0 ? props.progress : 1)}%;
  height: 13px;
  background-color: white;
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
