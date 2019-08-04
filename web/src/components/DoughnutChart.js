import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = async () => {
    const response = await fetch(
      `http://localhost:5000/api/chart?type=Doughnut`
    );
    const data = await response.json();
    changeChartData(data);
    console.log(data);
    setData(data);
  };

  const changeChartData = data => {
    var bar_ctx = document.getElementById(props.id).getContext("2d");
    let colors = [
      "rgba(255,140,125,1)",
      "rgba(0,225,125,1)",
      "rgba(82, 222, 225,1)",
      "rgba(102, 82, 225,1)",
      "rgba(225,225,125,1)",
      "rgba(225,0,125,1)",
      "rgba(40,125,255,1)"
    ];
    data.chart.datasets[0].backgroundColor = colors;
    data.chart.datasets[0].borderColor = "black";
    data.chart.datasets[0].borderWidth = 3;
  };

  return (
    <div>
      <h2 className="mb-1 mt-0">{data.name}</h2>
      <Doughnut
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
          }
        }}
        data={data.chart}
      />
    </div>
  );
};
export default DoughnutChart;
