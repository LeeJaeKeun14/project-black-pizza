import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Input from "../../Components/Input/Input";
import { useInput } from "../../hooks/useInput";
import { loginState } from "../../store/atoms";

const LoginForm = props => {
  const navigator = useNavigate();
  const email = useInput("");
  const password = useInput("");
  const setIsLogin = useSetRecoilState(loginState);
  const requestlogin = async body => {
    console.log(body);
    try {
      const { headers, data } = await axios.post("/api/user/signin", body);
      console.log(data);
      console.log(headers);

      if (data.status === 200) {
        setIsLogin(true);
        navigator("/");
      } else {
        data.msg && alert(data.msg);
      }
      return data;
    } catch (error) {
      // error.response.data && alert(error.response.data);
      // throw Error(error.response.data || error.message);
    }
  };
  const sendLoginInfo = e => {
    e.preventDefault();
    console.log(email.value);
    console.log(password.value);
    const data = { email: email.value, password: password.value };
    requestlogin(data);
  };
  return (
    <InputForm>
      <Title>login</Title>
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
      <Button onClick={sendLoginInfo}>login</Button>
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
const Button = styled.button`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding: 4px 16px;
  border-radius: 10px;
  border: none;
  margin: 30px 0;
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.coral};
    color: ${({ theme }) => theme.color.font};
  }
`;
export default LoginForm;
