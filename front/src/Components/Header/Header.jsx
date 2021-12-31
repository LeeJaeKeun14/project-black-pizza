import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = props => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios.get("/api/user/isSignin").then(res => {
      if (res.data.status === 200) {
        setIsLogin(true);
      }
    });
  }, []);
  const logout = () => {
    axios.get("api/user/signout").then(res => {
      if (res.data.status === 200) {
        setIsLogin(false);
      }
    });
  };
  return (
    <HeaderWrap>
      <Title>
        <Link to="/">Black Pizza 🍕</Link>
      </Title>

      {isLogin === true ? (
        <button onClick={logout}>로그아웃</button>
      ) : (
        <Nav>
          <LinkBlock>
            <Link to="/signup">가입하기</Link>
          </LinkBlock>
          <LinkBlock>
            <Link to="/login">로그인</Link>
          </LinkBlock>
        </Nav>
      )}
    </HeaderWrap>
  );
};
const HeaderWrap = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  z-index: 100;
`;

const Title = styled.h1`
  > a {
    ${({ theme }) => theme.font.large}
    color: ${({ theme }) => theme.color.font};
    text-decoration: none;
  }
`;
const Nav = styled.nav`
  display: flex;
`;
const LinkBlock = styled.div`
  ${({ theme }) => theme.font.small}

  & + & {
    padding-left: 10px;
  }
  > a {
    color: ${({ theme }) => theme.color.font};
    text-decoration: none;
  }
`;
export default Header;
