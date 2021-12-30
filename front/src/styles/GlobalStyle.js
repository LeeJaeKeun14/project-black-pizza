import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
	${reset}
	body{
		background: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.font};
    position: relative;
    display: block;
    width: 100%;
    height:100vh;
    line-height: 1.5;
    margin: 0 auto;
	}
  #root{
    height:100%
  }
  .App{
    height:100%    
  }
`;
