import React from "react";
import { useMemo } from "react";
import styled, { keyframes } from "styled-components";

const ProgressBar = ({ selectedCount, totalCount }) => {
  const progress = useMemo(() => {
    if (selectedCount === 0) {
      return 0;
    } else if (selectedCount > totalCount) {
      return 50;
    } else return Math.ceil((selectedCount / totalCount) * 100);
  }, [selectedCount, totalCount]);

  const total = useMemo(() => {
    if (selectedCount > totalCount) {
      return 0;
    } else return totalCount;
  }, [selectedCount, totalCount]);

  return (
    <ProgressBarBlock>
      <Text progress={progress}>
        {selectedCount > 5 ? "더 선택하시는군요!" : `${progress}%`}
      </Text>
      <Border>
        <Solid progress={progress} total={total} />
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
