import React from "react";
import styled from "styled-components";
import Item from "./Item";

const List = ({ data }) => (
  <ListWrap>
    {data.map((e, idx) => (
      <Item key={idx} data={e} />
    ))}
  </ListWrap>
);
const ListWrap = styled.section`
  // display: flex;
  // flex-wrap: wrap;
`;
export default List;
