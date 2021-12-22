import React from "react";

const Item = ({ data }) => {
  const [title, imgURL, saleType] = data;
  return (
    <div>
      <div>{title}</div>
      <img src={imgURL} alt="poster" />
      <div>
        {saleType["구매"] && (
          <div>
            <span>구매</span>
            {Object.entries(saleType["구매"]).map((e, idx) => (
              <div key={idx}>
                <span>{e[0] ? e[0] : ""}</span>
                <span>{e[1] ? e[1] : ""}</span>
              </div>
            ))}
          </div>
        )}

        {saleType["대여"] && (
          <div>
            <span>대여</span>
            {Object.entries(saleType["대여"]).map((e, idx) => (
              <div key={idx}>
                <span>{e[0] ? e[0] : ""}</span>
                <span>{e[1] ? e[1] : ""}</span>
              </div>
            ))}
          </div>
        )}
        {saleType["스트리밍"] && (
          <div>
            <span>스트리밍</span>
            {Object.entries(saleType["스트리밍"]).map((e, idx) => (
              <div key={idx}>
                <span>{e[0] ? e[0] : ""}</span>
                <span>{e[1] ? e[1] : ""}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
