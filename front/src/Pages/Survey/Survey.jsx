import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import List from "./List";

const Survey = props => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios("/api/contents/list ")
      .then(res => {
        setList(res.data);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <Header />
      <Content>
        <List data={list} />
      </Content>
    </div>
  );
};
const Content = styled.div`
  width: 720px;
  margin: 0 auto;
`;
export default Survey;
