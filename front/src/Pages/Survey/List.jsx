import React from "react";
import styled from "styled-components";
import Item from "./Item";

const List = props => (
  <ListWrap>
    {[1, 2, 3, 4, 5].map((e, idx) => (
      <Item key={idx} />
    ))}
  </ListWrap>
);
const ListWrap = styled.section`
  // display: flex;
  // flex-wrap: wrap;
`;
export default List;
