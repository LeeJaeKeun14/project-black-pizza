import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section4 from "./Section4";
import Section6 from "./Section6";
import Section7 from "./Section7";

const Description = props => {
  return (
    <DescBlock>
      <Header />
      <Section1 />
      <Section2 />
      <Section4 />
      <Section6 />
      <Section7 />
    </DescBlock>
  );
};
const DescBlock = styled.div`
  height: 100vh;
  > header {
    background-color: ${({ theme }) => theme.color.background};
  }
`;
export default Description;
