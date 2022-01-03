import React, { useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import LoginForm from "../../Pages/Login/LoginForm";
import SignupForm from "../../Pages/Signup/SignupForm";

const UserForm = ({ children }) => {
  const { pathname } = useLocation();
  // useEffect(() => {
  //   console.log(children);
  // }, [children]);
  return (
    <SignUpBlock>
      <Header />
      <SignUpWrap>
        <Part />
        {/* <Part>{pathname === "/signup" ? <SignupForm /> : <LoginForm />}</Part> */}
        <Part>{children}</Part>
      </SignUpWrap>
    </SignUpBlock>
  );
};
const SignUpBlock = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
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
export default UserForm;
