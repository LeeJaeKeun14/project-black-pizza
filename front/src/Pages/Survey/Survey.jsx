import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { ratingStateResult, contentList } from "../../store/atoms";
import List from "./List";

const Survey = props => {
  const navigator = useNavigate();
  const ratingArr = useRecoilValue(ratingStateResult);
  const [contents, setContents] = useRecoilState(contentList);
  const [list, setList] = useState([]);
  const [step, setStep] = useState(1);
  const [page, setPage] = useState(1);
  const targetRef = useRef();

  const observerOptions = { root: null, rootMargin: "0px", threshod: 0.5 };
  const observerCallback = async ([entries], observer) => {
    if (entries.isIntersecting) {
      observer.unobserve(entries.target);
      await fetchItems();
      observer.observe(entries.target);
    }
  };
  const fetchItems = async () => {
    if (step < 5) {
      const additionalList = contents.slice(20 * step, 20 * (step + 1));
      setStep(step + 1);
      setList(cur => {
        const newList = [...cur];
        newList.push(...additionalList);
        return newList;
      });
    }
  };
  useEffect(() => {
    axios
      .get(`/api/contents/list?page=${page}`)
      .then(res => {
        setList(res.data.list.slice(0, 20));
        setContents(res.data.list);
      })
      .catch(console.log);
  }, [setContents, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  });

  const requestResult = async () => {
    console.log(ratingArr);
    if (ratingArr.length > 0) {
      navigator("/result");
    } else {
      alert("1개이상 평점을 등록해주세요");
    }
  };
  return (
    <SurveyWrap>
      <Header />
      <div>
        <ProgressBar selectedCount={ratingArr.length} totalCount={5} />
        <Button onClick={requestResult}>추천영화 확인하기</Button>
      </div>

      <Content>
        <List data={list} />
        <BlockInfinity ref={targetRef}></BlockInfinity>
      </Content>
    </SurveyWrap>
  );
};
const SurveyWrap = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`;
const Button = styled.button`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
const Content = styled.div`
  padding: 0 50px 50px;
`;
const BlockInfinity = styled.div`
  height: 10px;
  background-color: white;
`;
export default Survey;
