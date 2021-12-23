import React from "react";
import styled from "styled-components";
import StarRating from "../../Components/StarRating/StarRating";
import { media } from "../../styles/theme";

const Item = ({ data }) => {
  const [title, imgURL] = data;
  return (
    <ItemWrap>
      <div>{title}</div>
      <Image src={imgURL} alt="poster" />
      <StarRating id={title} />
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
const Image = styled.img`
  width: 100%;
`;

export default Item;
