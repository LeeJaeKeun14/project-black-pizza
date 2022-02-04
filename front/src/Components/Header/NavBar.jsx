import React from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, socialLoginState } from "../../store/atoms";
import { logout } from "../../api/user";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { media } from "../../styles/theme";

const NavBar = ({ pathname }) => {
  const navigator = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const isSocialLogin = useRecoilValue(socialLoginState);
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    await logout().then(res => {
      if (res.status === 200) {
        setIsLogin(false);
        navigator("/");
      }
    });
  };

  return (
    <>
      <StyledBurger isOpen={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      {isLogin === true ? (
        <Nav isOpen={open}>
          <ListItem>
            <StyledLink to="/description">서비스 소개</StyledLink>
          </ListItem>
          {pathname !== "/survey" && (
            <ListItem>
              <StyledLink to="/survey">추천받기</StyledLink>
            </ListItem>
          )}
          <ListItem>
            {pathname === "/mypage" ? (
              isSocialLogin ? (
                <Anchor href="/oauth/kakao/signout">카카오 로그아웃</Anchor>
              ) : (
                <Button onClick={handleLogout}>로그아웃</Button>
              )
            ) : (
              <StyledLink to="/mypage">마이페이지</StyledLink>
            )}
          </ListItem>
        </Nav>
      ) : (
        <Nav open={open}>
          <ListItem>
            <StyledLink to="/description">서비스 소개</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/signup">가입하기</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/login">로그인</StyledLink>
          </ListItem>
        </Nav>
      )}
    </>
  );
};

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  ${media[768]} {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    position: static;
    padding: 0 6px;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ theme }) => theme.color.font};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${props => (props.isOpen ? "rotate(45deg)" : "rotate(0)")};
    }
    &:nth-child(2) {
      transform: ${props =>
        props.open ? "translateX(100%)" : "translateX(0)"};
      opacity: ${props => (props.isOpen ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${props => (props.isOpen ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
const Nav = styled.ul`
  display: flex;
  align-items: baseline;
  ${media[768]} {
    display: ${props => (props.isOpen ? "flex" : "none")};
    width: 100%;
    position: absolute;
    top: 80px;
    right: 0;
    left: 0;
    flex-direction: column;
    background-color: ${({ theme }) => theme.color.background};
    z-index: 1010;
  }
`;
const ListItem = styled.li`
  ${media[768]} {
    display: block;
    text-align: center;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #cccccc50;
    &:nth-child(1) {
      border-top: 1px solid #cccccc50;
    }
  }
`;
const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.font};
  text-decoration: none;
  ${({ theme }) => theme.font.small}
  padding: 0 6px;
`;
const Button = styled.button`
  color: ${({ theme }) => theme.color.font};
  ${({ theme }) => theme.font.small}
  background: none;
  border: none;
  cursor: pointer;
`;
const Anchor = styled.a`
  color: ${({ theme }) => theme.color.font};
  text-decoration: none;
  ${({ theme }) => theme.font.small}
  padding: 0 6px;
`;
export default NavBar;
