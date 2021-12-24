import React, { useState } from "react";
import styled from "styled-components";
import StarRating from "../../Components/StarRating/StarRating";
import { media } from "../../styles/theme";

const Item = ({ data }) => {
  const [title, imgURL] = data.info;
  const [display, setDisplay] = useState(0);
  const [isRated, setIsRated] = useState(0);
  const isRating = (id, res) => {
    if (res === true) setIsRated(1);
  };
  return (
    <ItemWrap>
      <ImageWrap
        onMouseEnter={() => setDisplay(1)}
        onMouseLeave={() => setDisplay(0)}
      >
        <Image src={imgURL} alt="poster" />
        <InfoWrap display={display} isRated={isRated}>
          <StarRating id={data.key} isRating={isRating} />
          <Title>{title}</Title>
        </InfoWrap>
      </ImageWrap>
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
const ImageWrap = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  display: block;
`;
const InfoWrap = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background: linear-gradient(#00000010, #000000);
  padding: 20px 0;
  visibility: ${props => {
    if (props.isRated) {
      return "visible";
    } else {
      if (props.display) return "visible";
      else return "hidden";
    }
  }};
`;
const Title = styled.div`
  text-align: center;
`;

export default Item;
