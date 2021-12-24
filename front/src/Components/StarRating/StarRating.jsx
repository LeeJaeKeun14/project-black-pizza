import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ratingState } from "../../store/atoms";
import Star from "./Star";

const StarRating = ({ id, isRating }) => {
  const setRating = useSetRecoilState(ratingState);
  const [rate, setRate] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const onMouseEnter = index => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = index => {
    setRate(index);

    setRating(cur => {
      const newObj = { ...cur };
      console.log(id);
      if (id in newObj) {
        if (newObj[id] === index) return cur;
        else newObj[id] = index;
      } else {
        newObj[id] = index;
      }
      return newObj;
    });
    isRating(id, true);
  };
  return (
    <RatingWrap>
      {[1, 2, 3, 4, 5].map(index => {
        return (
          <Star
            key={index}
            index={index}
            rating={rate}
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
  // width: 50px;
  // height: 100%;
  display: flex;
`;
export default StarRating;
