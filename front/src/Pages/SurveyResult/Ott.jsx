import React from "react";
import styled from "styled-components";

const Ott = ({ data }) => {
  const { ott, price, quality } = data;
  const priceRender = price => {
    if (price) {
      if (typeof price === "number") return `${price}원`;
      else return price;
    }
  };
  return (
    <OttBlock>
      <div>
        <span>{ott ? ott : ""}</span>
        {quality && <Quality>{quality}</Quality>}
      </div>

      <div>{priceRender(price)}</div>
    </OttBlock>
  );
};
const OttBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Quality = styled.span`
  margin-left: 5px;
  background-color: ${({ theme }) => theme.color.font};
  color: ${({ theme }) => theme.color.background3};
  border-radius: 5px;
  padding: 0 5px;
`;
export default Ott;
