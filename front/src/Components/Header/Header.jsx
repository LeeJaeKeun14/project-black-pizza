import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { logout } from "../../api/user";
import { loginState } from "../../store/atoms";
import { memo } from "react";

const Header = memo(props => {
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const navigator = useNavigate();
  const handleLogout = async () => {
    await logout().then(res => {
      if (res.status === 200) {
        setIsLogin(false);
        navigator("/");
      }
    });
  };

  return (
    <HeaderWrap location={pathname}>
      <StyledLink to="/">
        <Title>
          <Image src="/images/logo.png" alt="logo" />
          <div>BLACK PIZZA</div>
        </Title>
      </StyledLink>
      {isLogin === true ? (
        <Nav>
          <StyledLink to="/description">서비스 소개</StyledLink>
          <StyledLink to="/survey">
            {pathname === "/survey" ? null : " 추천받기"}
          </StyledLink>
          {pathname === "/mypage" ? (
            <Button onClick={handleLogout}>로그아웃</Button>
          ) : (
            <StyledLink to="/mypage">마이페이지</StyledLink>
          )}
        </Nav>
      ) : (
        <Nav>
          <StyledLink to="/description">서비스 소개</StyledLink>
          <StyledLink to="/signup">가입하기</StyledLink>
          <StyledLink to="/login">로그인</StyledLink>
        </Nav>
      )}
    </HeaderWrap>
  );
});
const HeaderWrap = styled.header`
  width: 100%;
  max-width: ${props => (props.location === "/" ? "" : "1024px")};
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
  // position: ${props => (props.location === "/" ? "fixed" : "static")};
  position: fixed;
  z-index: 100;
  background-color: ${({ theme }) => theme.color.background};
`;

const Title = styled.h1`
  ${({ theme }) => theme.font.large}
  color: ${({ theme }) => theme.color.font};
  text-decoration: none;
  align-items: center;
  display: flex;
`;
const Image = styled.img`
  width: 60px;
  height: 60px;
`;
const Nav = styled.nav`
  display: flex;
  align-items: baseline;
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
export default Header;
