import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { memo } from "react";
import NavBar from "./NavBar";
const Header = memo(props => {
  const { pathname } = useLocation();

  return (
    <HeaderWrap location={pathname}>
      <StyledLink to="/">
        <Title>
          <Image src="/images/logo.png" alt="logo" />
          <div>BLACK PIZZA</div>
        </Title>
      </StyledLink>
      <NavBar pathname={pathname} />
    </HeaderWrap>
  );
});
const HeaderWrap = styled.header`
  width: 100%;
  max-width: ${props =>
    props.location === "/" || props.location === "/description"
      ? ""
      : "1024px"};
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
const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.font};
  text-decoration: none;
  ${({ theme }) => theme.font.small}
  padding: 0 6px;
`;
export default Header;
