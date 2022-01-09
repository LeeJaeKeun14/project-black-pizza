import React, { useState } from "react";
import { memo } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ratingState } from "../../store/atoms";
import Star from "./Star";

const StarRating = memo(({ id, isRating }) => {
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
    setRate(cur => (cur === index ? 0 : index));

    setRating(cur => {
      const newObj = { ...cur };
      if (id in newObj) {
        if (newObj[id].score === index)
          newObj[id] = { ...newObj[id], score: 0 };
        else newObj[id] = { ...newObj[id], score: index };
      } else {
        newObj[id] = { contents_id: id, score: index, is_picked: false };
      }

      return newObj;
    });
    isRating(id, index);
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
});
const RatingWrap = styled.div`
  // width: 50px;
  // height: 100%;
  display: flex;
`;
export default StarRating;
