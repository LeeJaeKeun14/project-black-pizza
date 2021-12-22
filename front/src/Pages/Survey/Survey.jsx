import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { ratingState } from "../../store/atoms";
import List from "./List";

const Survey = props => {
  const navigator = useNavigate();
  const rating = useRecoilValue(ratingState);
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/contents/list ")
      .then(res => {
        setList(res.data);
      })
      .catch(console.log);
  }, []);
  const requestResult = async () => {
    console.log(rating);
    if (rating.length > 0) {
      navigator("/result");
    } else {
      alert("1개이상 평점을 등록해주세요");
    }
  };
  return (
    <div>
      <Header />
      <button onClick={requestResult}>click</button>
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
