import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const LineChart = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = async () => {
    const response = await fetch(`http://localhost:5000/api/chart?type=Line`);
    const data = await response.json();
    changeChartData(data);
    setData(data);
  };

  const setGradientColor = (chart, color) => {
    const gradient = chart.createLinearGradient(0, 0, 700, 0);
    //color = color.slice(0, -2) + "0.35)";
    gradient.addColorStop(0, color);
    color = color.slice(0, -4) + "125,1)";
    gradient.addColorStop(1, color);
    return gradient;
  };

  const changeChartData = data => {
    var bar_ctx = document.getElementById(props.id).getContext("2d");
    data.chart.datasets.forEach((set, i) => {
      let colors = [
        "rgba(255,140,0,1)",
        "rgba(0,225,0,1)",
        "rgba(82, 222, 225,1)",
        "rgba(102, 82, 225,1)",
        "rgba(225,225,0,1)",
        "rgba(225,0,0,1)",
        "rgba(40,125,255,1)"
      ];
      set.backgroundColor = setGradientColor(bar_ctx, colors[i]);
      set.borderColor = "black";
      set.borderWidth = 3;
    });
  };

  return (
    <div>
      <h2 className="mb-1 mt-0">{data.name}</h2>
      <Line
        id={props.id}
        options={{
          responsive: true,
          legend: {
            labels: {
              fontColor: "white",
              fontSize: 16,
              padding: 35,
              fontFamily:
                '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
            }
          },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Year",
                  fontColor: "white",
                  fontSize: 25,
                  fontFamily:
                    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
                },
                ticks: {
                  fontColor: "white"
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Copies Sold",
                  fontColor: "white",
                  fontSize: 25,
                  fontFamily:
                    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
                },
                ticks: {
                  fontColor: "white"
                }
              }
            ]
          }
        }}
        data={data.chart}
      />
    </div>
  );
};

export default LineChart;
