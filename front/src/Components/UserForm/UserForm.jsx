import React, { useEffect } from "react";
import { useLocation } from "react-router";
// import { useLocation } from "react-router";
import styled from "styled-components";
import Header from "../../Components/Header/Header";

const UserForm = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <SignUpBlock>
      <Header />
      <SignUpWrap>
        {/* {pathname === "/login" ? (
          <Title>블랙피자 로그인</Title>
        ) : (
          <Title>블랙피자 회원가입</Title>
        )} */}
        <Title>블랙피자</Title>
        <Part>{children}</Part>
      </SignUpWrap>
    </SignUpBlock>
  );
};
const SignUpBlock = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  max-width: 1024px;
`;
const SignUpWrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  align-items: center;
  box-sizing: border-box;
`;
const Part = styled.div`
  flex: 1 1 0%;
  text-align: center;
  display: flex;
  justify-content: center;
`;
const Title = styled.h2`
  flex: 1 1 0%;
  text-align: center;
  display: flex;
  justify-content: center;
  ${({ theme }) => theme.font.large}
`;
export default UserForm;
