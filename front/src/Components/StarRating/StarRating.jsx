import React, { useState } from "react";
import styled from "styled-components";
import Rating from "./Rating";

const StarRating = props => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const onMouseEnter = index => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = index => {
    setRating(index);
  };
  return (
    <RatingWrap>
      {[1, 2, 3, 4, 5].map(index => {
        return (
          <Rating
            key={index}
            index={index}
            rating={rating}
            hoverRating={hoverRating}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSaveRating={onSaveRating}
          />
        );
      })}
    </RatingWrap>
  );
};
const RatingWrap = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
`;
export default StarRating;
