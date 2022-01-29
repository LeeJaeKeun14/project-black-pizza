import React from "react";
import styled from "styled-components";

const Loading = props => (
  <LoadingBlock>
    <LoadingBox />
  </LoadingBlock>
);
const LoadingBlock = styled.div`
  padding: 10px 0;
  text-align: center;
`;
const LoadingBox = styled.div`
  width: 1em;
  height: 1em;
  display: inline-block;
  border: 2px solid ${({ theme }) => theme.color.background3};
  border-radius: 50%;
  border-top: 2px solid ${({ theme }) => theme.color.font};
  margin: 0 auto;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(369deg);
    }
  }
`;
export default Loading;
