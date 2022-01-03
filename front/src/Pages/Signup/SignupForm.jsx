import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { signUp } from "../../api/user";
import Input from "../../Components/Input/Input";
import { useInput } from "../../hooks/useInput";

const SignupForm = props => {
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const password2 = useInput("");
  const navigator = useNavigate();
  const [message, setMseeage] = useState("");
  const reqeustPost = async signUpInfo => {
    await signUp(signUpInfo).then(res => {
      if (res.status === 200) {
        navigator("/login");
        alert(res.msg);
      } else {
        res.msg && setMseeage(res.msg);
      }
    });
  };

  const registeUser = e => {
    e.preventDefault();
    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
      password2: password2.value,
    };
    reqeustPost(data);
  };
  return (
    <InputForm>
      <Title>회원가입</Title>
      <Input
        inputId={"name"}
        inputType={"text"}
        label={"이름"}
        placeholder={"김감자"}
        onChangeHandler={name.setValue}
      />
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
      <Input
        inputId={"password2"}
        inputType={"password"}
        label={"비밀번호 확인"}
        placeholder={"●●●●●●●●"}
        onChangeHandler={password2.setValue}
      />
      <Alert>{message}</Alert>
      <Button onClick={registeUser}>가입하기</Button>
    </InputForm>
  );
};

const InputForm = styled.form`
  padding: 20px 50px;
  width: 300px;
  background-color: ${({ theme }) => theme.color.background2};
  border-radius: 25px;
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
export default SignupForm;
