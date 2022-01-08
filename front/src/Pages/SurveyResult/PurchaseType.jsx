import React from "react";
import styled from "styled-components";
import Ott from "./Ott";

const PurchaseType = ({ type }) => {
  const [saleType, priceByCompany] = type;

  return (
    <PurchaseTypeBlock>
      <PurchaseTitle>{saleType}</PurchaseTitle>
      <OttWrap>
        {priceByCompany.map((e, idx) => (
          <Ott key={idx} data={e} />
        ))}
      </OttWrap>
    </PurchaseTypeBlock>
  );
};
const PurchaseTypeBlock = styled.div`
  & + & {
    padding-top: 10px;
  }
`;
const PurchaseTitle = styled.div`
  font-weight: bold;
  padding-bottom: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.color.point2};
`;
const OttWrap = styled.div`
  padding: 5px 0;
`;
export default PurchaseType;
