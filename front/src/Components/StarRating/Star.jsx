import React, { useMemo } from "react";
import styled from "styled-components";
import StarIcon from "./StarIcon";

const Star = ({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
}) => {
  const fill = useMemo(() => {
    if (hoverRating >= index) {
      return "#ffdd63";
    } else if (!hoverRating && rating >= index) {
      return "#ffdd63";
    }
    return "#eee";
  }, [rating, hoverRating, index]);
  return (
    <StarWrap
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <StarIcon fill={fill} />
    </StarWrap>
  );
};
const StarWrap = styled.div`
  width: 20%;
  min-width: 24px;
`;
export default Star;
