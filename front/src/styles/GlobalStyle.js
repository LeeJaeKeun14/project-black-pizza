import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { media } from './theme';

export const GlobalStyle = createGlobalStyle`
	${reset}
  html {
    font-size:16px;
    ${media.mobile}{
      font-size: 10px;
    }
  }
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
