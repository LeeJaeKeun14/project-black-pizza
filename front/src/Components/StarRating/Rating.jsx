import React, { useMemo } from "react";
import StarIcon from "./StarIcon";

const Rating = ({
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
    <div
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <StarIcon fill={fill} />
    </div>
  );
};

export default Rating;
