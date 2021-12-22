import React from "react";
import StarRating from "../../Components/StarRating/StarRating";

const Item = ({ data }) => {
  const [title, imgURL] = data;
  return (
    <div>
      <div>{title}</div>
      <img src={imgURL} alt="poster" />
      <StarRating />
    </div>
  );
};

export default Item;
