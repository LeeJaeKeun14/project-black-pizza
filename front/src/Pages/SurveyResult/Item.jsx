import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { media } from "../../styles/theme";

const Item = ({ id, data }) => {
  const navigator = useNavigate();
  const [display, setDisplay] = useState(0);
  const [title, imgURL, saleType] = data;
  const goDetail = () => {
    navigator(`/detail/${id}`);
  };
  const renderPrice = type => {
    return (
      saleType[type] && (
        <div>
          <span>{type}</span>
          {saleType[type].map((e, idx) => (
            <div key={idx}>
              <span>{e.ott ? e.ott : ""}</span>
              <span>{e.price ? e.price : ""}</span>
            </div>
          ))}
        </div>
      )
    );
  };
  return (
    <ItemWrap>
      <ImageWrap
        onMouseEnter={() => setDisplay(1)}
        onMouseLeave={() => setDisplay(0)}
      >
        <Image src={imgURL} alt="poster" />
        <Button display={display} onClick={goDetail}>
          콘텐츠 상세보기
        </Button>
      </ImageWrap>

      <div>
        {renderPrice("구매")}
        {renderPrice("대여")}
        {renderPrice("스트리밍")}
      </div>
      <div>{title}</div>
    </ItemWrap>
  );
};
const ItemWrap = styled.div`
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
  visibility:${props => (props.display ? "visible" : "hidden")} ;
}
`;
const ImageWrap = styled.div`
  position: relative;
  cursor: pointer;
  }
`;
const Image = styled.img`
  width: 100%;
  display: block;
`;

export default Item;
