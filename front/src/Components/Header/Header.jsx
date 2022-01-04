import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginState } from "../../store/atoms";

const Header = props => {
  const { pathname } = useLocation();
  const isLogin = useRecoilValue(loginState);

  return (
    <HeaderWrap>
      <StyledLink to="/">
        <Title>Black Pizza 🍕 </Title>
      </StyledLink>

      {isLogin === true ? (
        <Nav>
          <StyledLink
            location={(pathname === "/survey").toString()}
            to="/survey"
          >
            추천받기
          </StyledLink>
          <StyledLink to="/mypage">마이페이지</StyledLink>
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
  align-items: center;
`;

const Title = styled.h1`
  ${({ theme }) => theme.font.large}
  color: ${({ theme }) => theme.color.font};
  text-decoration: none;
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
  display: ${props => (props.location === "true" ? "none" : "block")};
`;
export default Header;
