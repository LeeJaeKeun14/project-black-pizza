import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { logIn } from "../../api/user";
import Input from "../../Components/Input/Input";
import { useInput } from "../../hooks/useInput";
import { loginState } from "../../store/atoms";
import { media } from "../../styles/theme";

const LoginForm = props => {
  const navigator = useNavigate();
  const email = useInput("");
  const password = useInput("");
  const setIsLogin = useSetRecoilState(loginState);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const { from, message } = location.state || { from: "/", message: "" };

  const requestlogin = async loginInfo => {
    await logIn(loginInfo).then(res => {
      if (res.status === 200) {
        setIsLogin(true);
        navigator(from);
      } else {
        res.msg && setErrorMessage(res.msg);
      }
    });
  };

  const sendLoginInfo = e => {
    e.preventDefault();
    const data = { email: email.value, password: password.value };
    requestlogin(data);
  };
  return (
    <InputForm>
      <Title>로그인</Title>
      <p>{message}</p>
      <Input
        inputId={"email"}
        inputType={"email"}
        label={"이메일"}
        placeholder={"potato@farm.com"}
        onChangeHandler={email.setValue}
      />
      <Input
        inputId={"password"}
        inputType={"password"}
        label={"비밀번호"}
        placeholder={"●●●●●●●●"}
        onChangeHandler={password.setValue}
      />
      <Alert>{errorMessage}</Alert>
      <Button onClick={sendLoginInfo}>login</Button>
    </InputForm>
  );
};

const InputForm = styled.form`
  padding: 20px 50px;
  width: 300px;
  background-color: ${({ theme }) => theme.color.background2};
  border-radius: 25px;
  ${media.mobile} {
    width: 100%;
    margin: 0 20px;
  }
`;
const Title = styled.h1`
  ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.color.font};

  margin: 20px 0;
`;
const Alert = styled.p`
  padding: 20px 0;
`;
const Button = styled.button`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding: 4px 16px;
  border-radius: 10px;
  border: none;
  margin-bottom: 30px;
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.coral};
    color: ${({ theme }) => theme.color.font};
  }
`;
export default LoginForm;
