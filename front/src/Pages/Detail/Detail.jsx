import React from "react";
import { useParams } from "react-router";

const Detail = props => {
  const { id } = useParams();

  return (
    <div>
      <div>detail</div>
      <div>{id}</div>
    </div>
  );
};

export default Detail;
