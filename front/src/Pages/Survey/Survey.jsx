import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import StarRating from "../../Components/StarRating/StarRating";
import List from "./List";

const Survey = props => (
  <div>
    <Header />
    <Content>
      <List />
      <StarRating />
    </Content>
  </div>
);
const Content = styled.div`
  width: 720px;
  margin: 0 auto;
`;
export default Survey;
