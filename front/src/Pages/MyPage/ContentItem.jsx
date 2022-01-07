import React, { useEffect, useState } from "react";
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
    >
      <Image src={info[1]} alt="poster" />
      <Button
        onClick={goContentDetail}
        isHover={isHover}
      >{`${info[0]} 상세보기`}</Button>
    </ContentItemBlock>
  );
};
const ContentItemBlock = styled.div`
  position: relative;
  padding: 10px;
  box-sizing: border-box;

  width: ${100 / 4}%;
  ${media.tablet} {
    width: ${100 / 3}%;
  }
  ${media.mobile} {
    width: ${100 / 2}%;
  }
`;
const Button = styled.button`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  cursor: pointer;
  background: linear-gradient(#00000030, black);
  color: white;
  border: none;
  width: 100%;
  height: 50%;
  visibility:${props => (props.isHover ? "visible" : "hidden")} ;
  
}
`;
const Image = styled.img`
  width: 100%;
  display: block;
  border-radius: 10px;
`;
export default ContentItem;
