import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginState } from "../../store/atoms";

const Header = props => {
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useRecoilState(loginState);

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
        <Nav>
          <StyledLink
            location={(pathname === "/survey").toString()}
            to="/survey"
          >
            영화 찾으러 가기
          </StyledLink>
          <Button onClick={logout}>로그아웃</Button>
        </Nav>
      ) : (
        <Nav>
          <StyledLink to="/signup">가입하기</StyledLink>

          <StyledLink to="/login">로그인</StyledLink>
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
  align-items: center;
`;
const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.font};
  text-decoration: none;
  ${({ theme }) => theme.font.small}
  padding: 0 6px;
  display: ${props => (props.location === "true" ? "none" : "block")};
`;
const Button = styled.button`
  color: ${({ theme }) => theme.color.font};
  ${({ theme }) => theme.font.small}
  background: none;
  border: none;
  cursor: pointer;
`;
export default Header;
