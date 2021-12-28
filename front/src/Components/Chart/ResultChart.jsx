import React, { useEffect, useMemo } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
const ResultChart = ({ data }) => {
  const options = {
    responsive: false,
    plugin: {
      legend: {},
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
        ctx.fillStyle = "white";
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
            "#726A95",
            "#709FB0",
            "#A0C1B8",
            "#F4EBC1",
            "#FFF9F9",
          ],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          borderColor: "none",
          cutout: "70%",
          weight: 10,
        },
      ],
      text: "24",
    };
    return temp;
  }, [data]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <ChartBlock>
      <Doughnut
        data={chartData}
        style={{
          // position: "relative",
          margin: "auto",
          // width: "500",
          // height: "500",
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
