import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
	${reset}
	body{
		background: #1e1e22;
    color: #ccc;
    position: relative;
    display: block;
    width: 100%;
    line-height: 1.5;
    margin: 0 auto;
	}
`;
