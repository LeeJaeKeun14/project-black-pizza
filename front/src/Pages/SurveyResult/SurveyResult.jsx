import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { ratingState } from "../../store/atoms";
import Item from "./Item";

const SurveyResult = props => {
  const rating = useRecoilValue(ratingState);
  const [result, setResult] = useState({});

  useEffect(() => {
    axios.post("api/contents/recommend", { data: rating }).then(res => {
      console.log(res);
      setResult(res.data);
    });
  }, [rating]);
  useEffect(() => {
    axios.get("api/contents/recommend").then(res => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <Header />
      <Content>
        {Object.values(result).map((e, idx) => (
          <Item key={idx} data={e} />
        ))}
      </Content>
    </div>
  );
};
const Content = styled.section`
  width: 720px;
  margin: 0 auto;
`;
export default SurveyResult;
