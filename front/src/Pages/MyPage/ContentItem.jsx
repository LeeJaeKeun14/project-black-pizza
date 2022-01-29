import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { media } from "../../styles/theme";

const ContentItem = ({ data }) => {
  const navigator = useNavigate();
  const { info, key } = data;
  const [isHover, setIsHover] = useState(false);
  const goContentDetail = () => {
    navigator(`/detail/${key}`);
  };

  return (
    <ContentItemBlock
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={goContentDetail}
    >
      <ContentWrap>
        <Image src={info[1]} alt="poster" loading="lazy" />
        <Hovering isHover={isHover}>{`${info[0]} 상세보기`}</Hovering>
      </ContentWrap>
    </ContentItemBlock>
  );
};

const ContentItemBlock = styled.div`
  padding: 10px;
  box-sizing: border-box;
`;
const ContentWrap = styled.div`
  position: relative;
`;
const Hovering = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  cursor: pointer;
  background: linear-gradient(#00000030, black);
  color: white;
  border: none;
  width: 100%;
  height: 300px;
  visibility:${props => (props.isHover ? "visible" : "hidden")} ;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  // line-height: 300px;
}
`;
const Image = styled.img`
  // width: 100%;
  width: 211px;
  height: 300px;
  display: block;
  border-radius: 10px;
  margin: 0 auto;
  @-webkit-keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  -webkit-animation: skeleton-gradient 1.8s infinite ease-in-out;
  animation: skeleton-gradient 1.8s infinite ease-in-out;
`;
export default ContentItem;
