import React from "react";
import styled from "styled-components";

const LazyImage = ({ src, name }) => {
  return <Image src={src} alt={name} />;
};
export default LazyImage;
const Image = styled.img`
  width: 100%;
  display: block;
`;
