import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = props => {
  return (
    <HeaderWrap>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Title>Black Pizza 🍕</Title>
      </Link>
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
  ${({ theme }) => theme.font.large}
  color:${({ theme }) => theme.color.font}
`;
export default Header;
