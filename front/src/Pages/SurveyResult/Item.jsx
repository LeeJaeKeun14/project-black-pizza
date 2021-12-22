import React from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";

const Item = ({ data }) => {
  const [title, imgURL, saleType] = data;
  return (
    <ItemWrap>
      <div>{title}</div>
      <Image src={imgURL} alt="poster" />
      <div>
        {saleType["구매"] && (
          <div>
            <span>구매</span>
            {Object.entries(saleType["구매"]).map((e, idx) => (
              <div key={idx}>
                <span>{e[0] ? e[0] : ""}</span>
                <span>{e[1] ? e[1] : ""}</span>
              </div>
            ))}
          </div>
        )}

        {saleType["대여"] && (
          <div>
            <span>대여</span>
            {Object.entries(saleType["대여"]).map((e, idx) => (
              <div key={idx}>
                <span>{e[0] ? e[0] : ""}</span>
                <span>{e[1] ? e[1] : ""}</span>
              </div>
            ))}
          </div>
        )}
        {saleType["스트리밍"] && (
          <div>
            <span>스트리밍</span>
            {Object.entries(saleType["스트리밍"]).map((e, idx) => (
              <div key={idx}>
                <span>{e[0] ? e[0] : ""}</span>
                <span>{e[1] ? e[1] : ""}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ItemWrap>
  );
};
const ItemWrap = styled.div`
  padding: 10px;
  box-sizing: border-box;
  width: ${100 / 3}%;
  // ${media.mobile}} {
  //   width: ${100 / 2}%;
  // }
  // ${media.tablet} {
  //   width: ${100 / 3}%;
  // }
`;
const Image = styled.img`
  width: 100%;
`;
export default Item;
