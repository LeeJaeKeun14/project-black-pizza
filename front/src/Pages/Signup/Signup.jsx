import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import Input from "../../Components/Input/Input";
import { useInput } from "../../hooks/useInput";

const Signup = props => {
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const password2 = useInput("");
  const navigator = useNavigate();
  const reqeustPost = async body => {
    console.log(body);
    try {
      const { data } = await axios.post("/api/user/signup", body);
      console.log(data);

      if (data.status === 200) {
        navigator("/login");
      } else {
        data.msg && alert(data.msg);
      }
      return data;
    } catch (error) {
      error.response.data && alert(error.response.data);
      throw Error(error.response.data || error.message);
    }
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
export default Signup;
