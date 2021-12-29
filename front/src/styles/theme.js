import { css } from "styled-components";

const font = {
  xsmall: css`
    font-size: 1rem;
    font-weight: 400;
  `,
  small: css`
    font-size: 1.2rem;
    font-weight: 400;
  `,
  medium: css`
    font-size: 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 2rem;
    font-weight: 700;
  `,
  xlarge: css`
    font-size: 3rem;
    font-weight: 700;
  `,
};
const color = {
  font: '#ccc',
  // background: '#1e1e22',
  // 갈수록 흰색
  background: '#0f102a',
  background2: '#29273d',
  background3: '#434458',

  point: '#7148a9',
  point2: '#887d99',
  coral: '#b84f55'
}
export const theme = {
  font,
  color
}

const customMediaQuery = (maxWidth) =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  1440: customMediaQuery(1440),
  768: customMediaQuery(768),
  tablet: customMediaQuery(1024),
  mobile: customMediaQuery(500),
};
