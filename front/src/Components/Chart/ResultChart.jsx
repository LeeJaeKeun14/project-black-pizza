import React, { useEffect, useMemo } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
const ResultChart = ({ data }) => {
  const options = {
    responsive: false,
    plugins: {
      legend: { display: false },
    },
  };
  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textColor = "red";
        ctx.textBaseline = "top";
        var text = "추천 OTT",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillStyle = "#ccc";
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];
  const chartData = useMemo(() => {
    const temp = {
      labels: Object.entries(data)
        .filter(([key, val]) => val !== 0)
        .sort((a, b) => b[1] - a[1])
        .map(e => e[0]),
      datasets: [
        {
          data: Object.values(data)
            .filter(e => e !== 0)
            .sort((a, b) => b - a),
          backgroundColor: [
            "#b84f55",
            "#ffeea1",
            "#fbefb5",
            "#F4EBC1",
            "#f9f2d1",
            "#ffff30",
          ],
          hoverBackgroundColor: ["#d7acaf"],
          borderColor: "none",
          cutout: "70%",
          weight: 10,
        },
      ],
      text: "24",
    };
    return temp;
  }, [data]);
  return (
    <ChartBlock>
      <Doughnut
        data={chartData}
        style={{
          // position: "relative",
          margin: "auto",
          width: "300px",
          height: "300px",
        }}
        width={500}
        height={500}
        options={options}
        plugins={plugins}
      />
    </ChartBlock>
  );
};
const ChartBlock = styled.div`
  position: relative;
`;
export default ResultChart;
