import React from "react";
import styled from "styled-components";
import Ott from "./Ott";

const PurchaseType = ({ type }) => {
  const [saleType, priceByCompany] = type;
  const renderSaleType = type => {
    if (type === "buy") {
      return "구매";
    } else if (type === "rent") {
      return "대여";
    } else {
      return "스트리밍";
    }
  };
  return (
    <PurchaseTypeBlock>
      <PurchaseTitle>{renderSaleType(saleType)}</PurchaseTitle>
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
