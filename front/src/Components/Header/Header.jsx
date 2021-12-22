import React from "react";
import styled from "styled-components";

const Header = props => {
  return (
    <HeaderWrap>
      <div>title</div>
      <div>nav</div>
    </HeaderWrap>
  );
};
const HeaderWrap = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  ${({ theme }) => theme.font.large}
`;
export default Header;
