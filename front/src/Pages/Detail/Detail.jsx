import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = props => {
  const { id } = useParams();
  const [info, setInfo] = useState([]);
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
      <div>{info.title && info.title}</div>
      <img src={info.image && info.image} alt="poster" />
      <div>{info.open_year && info.open_year}</div>
      <div>
        {info.genre && info.genre.map((e, i) => <span key={i}>{e}</span>)}
      </div>
      <div>{info.runtime && info.runtime}</div>
      <div>{info.director && info.director}</div>
      <div>
        {info.actor && info.actor.map((e, i) => <span key={i}>{e}</span>)}
      </div>
    </div>
  );
};

export default Detail;
