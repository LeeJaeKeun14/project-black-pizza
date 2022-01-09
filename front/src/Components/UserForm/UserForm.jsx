import React from "react";
import { Navigate } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { loginState } from "../../store/atoms";
import { media } from "../../styles/theme";

const UserForm = ({ children }) => {
  const isLogin = useRecoilValue(loginState);
  if (isLogin) return <Navigate to="/" />;
  return (
    <SignUpBlock>
      <Header />
      <SignUpWrap>
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
  ${media.tablet} {
    display: none;
  }
`;
export default UserForm;
