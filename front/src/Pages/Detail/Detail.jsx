import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = props => {
  const { id } = useParams();
  const [info, setInfo] = useState([]);
  const [title, imgURL, release, genre, runningTime, director, actors] = info;
  useEffect(() => {
    axios(`/api/contents/detail/${id}`)
      .then(res => {
        console.log(res);
        setInfo(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);
  return (
    <div>
      <div>detail</div>
      <div>{title && title}</div>
      <img src={title && imgURL} alt="poster" />
      <div>{release && release}</div>
      <div>{genre && genre}</div>
      <div>{runningTime && runningTime}</div>
      <div>{director && director}</div>
      <div>{actors && actors.map((e, i) => <span key={i}>{e}</span>)}</div>
    </div>
  );
};

export default Detail;
