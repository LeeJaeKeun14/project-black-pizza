import axios from "axios";
import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import Input from "../../Components/Input/Input";
import { useInput } from "../../hooks/useInput";

const Signup = props => {
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const password2 = useInput("");
  const reqeustPost = async data => {
    console.log(data);
    const res = await axios
      .post("/api/user/signup", data, {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then(res => {
        console.log(res);
      });
  };

  const registeUser = () => {
    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
      password2: password2.value,
    };
    reqeustPost(data);
  };
  return (
    <SignUpBlock>
      <Header />
      <SignUpWrap>
        <Part />
        <Part>
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
              onChangeHandler={name.setValue}
            />
            <Input
              inputId={"password"}
              inputType={"password"}
              label={"비밀번호"}
              placeholder={"●●●●●●●●"}
              onChangeHandler={name.setValue}
            />
            <Input
              inputId={"password2"}
              inputType={"password"}
              label={"비밀번호 확인"}
              placeholder={"●●●●●●●●"}
              onChangeHandler={name.setValue}
            />
            <Button onClick={registeUser}>가입하기</Button>
          </InputForm>
        </Part>
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
const InputForm = styled.div`
  padding: 20px 50px;
  width: 400px;
  background-color: #fdfdfd;
  border-radius: 25px;
  // div + div {
  //   padding-top: 16px;
  // }
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
  background-color: #eee;
  cursor: pointer;
  &:hover {
    background-color: #ccc4d9;
  }
`;
export default Signup;
