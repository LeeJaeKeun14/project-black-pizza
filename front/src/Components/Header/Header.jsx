import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = props => {
  return (
    <HeaderWrap>
      <Title>
        <Link to="/">Black Pizza 🍕</Link>
      </Title>
      <Nav>
        <LinkBlock>
          <Link to="/signup">가입하기</Link>
        </LinkBlock>
        <LinkBlock>
          <Link to="/login">로그인</Link>
        </LinkBlock>
      </Nav>
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
