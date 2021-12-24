import React, { memo, useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { media } from "../../styles/theme";

import PurchaseType from "./PurchaseType";

const Item = memo(({ id, data }) => {
  const navigator = useNavigate();
  const [display, setDisplay] = useState(0);
  const [title, imgURL, saleType] = data;
  const goDetail = () => {
    navigator(`/detail/${id}`);
  };

  return (
    <ItemWrap>
      <ImageWrap
        onMouseEnter={() => setDisplay(1)}
        onMouseLeave={() => setDisplay(0)}
      >
        <Image src={imgURL} alt="poster" />
        <Button display={display} onClick={goDetail}>
          {`${title} 상세보기`}
        </Button>
      </ImageWrap>

      <AllPrice>
        {/* {["buy", "rent", "streaming"].map((e, i) => {
          return (
            saleType[e] && <PurchaseType key={i} saleType={saleType} type={e} />
          );
        })} */}
        {Object.entries(saleType).map(
          ([key, value], i) =>
            value.length !== 0 && (
              <PurchaseType key={i} saleType={saleType} type={[key, value]} />
            )
        )}
      </AllPrice>
    </ItemWrap>
  );
});
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

const AllPrice = memo(styled.div`
  background-color: ${({ theme }) => theme.color.point};
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
`);

export default Item;
