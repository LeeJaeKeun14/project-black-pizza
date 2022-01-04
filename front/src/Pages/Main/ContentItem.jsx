import React from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";

const ContentItem = ({
  data,
  onMouseEnter,
  onMouseLeave,
  onSelectItem,
  hoveringContent,
  selectContent,
}) => (
  <ImageBlock
    hovering={hoveringContent === data.key || selectContent === data.key}
  >
    <Image
      src={data.info[1]}
      alt="poster"
      onClick={() => onSelectItem(data.key)}
      onMouseEnter={() => onMouseEnter(data.key)}
      onMouseLeave={() => onMouseLeave()}
    />
  </ImageBlock>
);

const ImageBlock = styled.li`
  border-radius: 10px;
  margin: 20px;
  width: 12%;
  position: relative;
  display: inline-block;
  transform: ${props => (props.hovering ? "scale(1.2)" : "none")};
  & + & {
    // margin: 20px 20px 20px 0;
  }
  transition: transform 0.2s;
  &:hover {
    // border: 1px solid white;
    // width: 30%;
    // transform: scale(1.2);
    z-index: 100;
  }

  ${media[1440]} {
    width: 20%;
  }
  ${media.mobile} {
    width: 50%;
  }
`;
const Image = styled.img`
  width: 100%;
  border-radius: 10px;
  display: block;
`;
export default ContentItem;
