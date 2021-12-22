import React, { useState } from "react";
import Rating from "../Components/StarRating/Rating";

const Main = props => {
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
    <div style={{ height: "50px" }}>
      <div
        className="box flex"
        style={{
          width: "50px",
          height: "100%",
          display: "flex",
          // flexDirection: "row",
        }}
      >
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
      </div>
    </div>
  );
};

export default Main;
