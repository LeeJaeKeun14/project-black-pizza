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
  ranking = 0,
}) => {
  return (
    <ImageBlock
      hovering={hoveringContent === data.key || selectContent === data.key}
    >
      {ranking !== 0 && <Rank>{ranking}</Rank>}
      <Image
        src={data.info[1]}
        alt="poster"
        onClick={() => onSelectItem(data.key)}
        onMouseEnter={() => onMouseEnter(data.key)}
        onMouseLeave={() => onMouseLeave()}
      />
      {data.ott && (
        <OttWrap>
          {data.ott.map((e, i) => (
            <OttSpan key={i}>{e}</OttSpan>
          ))}
        </OttWrap>
      )}
    </ImageBlock>
  );
};

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
  ${media.tablet} {
    width: 33%;
  }
  ${media.mobile} {
    width: 50%;
  }
`;
const Rank = styled.span`
  position: absolute;

  background-color: rgba(0, 0, 0, 0.77);
  color: rgb(255, 255, 255);
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  opacity: 1;
  transition: opacity 300ms ease 0s;
  bottom: 6px;
  left: 6px;
  width: 28px;
  height: 28px;
  line-height: 27px;
`;
const Image = styled.img`
  width: 100%;
  border-radius: 10px;
  display: block;
`;
const OttWrap = styled.div`
  position: absolute;
  bottom: 6px;
  left: 6px;
`;
const OttSpan = styled.span`
  & + & {
    margin-left: 5px;
  }
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  opacity: 1;
  padding: 2px 5px;
  background-color: ${({ theme }) => theme.color.coral}; ;
`;
export default ContentItem;
