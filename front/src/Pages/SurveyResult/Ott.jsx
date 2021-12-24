import React from "react";
import styled from "styled-components";

const Ott = ({ data }) => {
  const { ott, price } = data;
  const priceRender = price => {
    if (price) {
      if (typeof price === "number") return `${price}원`;
      else return price;
    }
  };
  return (
    <OttBlock>
      <div>{ott ? ott : ""}</div>
      <div>{priceRender(price)}</div>
    </OttBlock>
  );
};
const OttBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default Ott;
