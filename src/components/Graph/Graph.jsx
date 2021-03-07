import React from "react";
import { Line } from "react-chartjs-2";

export default function Graph(props) {
  let prices = [];
  for (let price of props.stockGraph.prices) {
    prices.push(price[1]);
  }
  return (
    <div>
      <Line
        data={{
          labels: prices,
          datasets: [
            {
              label: "Stock Progress",
              data: prices,
              fill: false,
              borderColor: "#5B83C3",
              borderWidth: 2,
              pointBackgroundColor: "#4adbc8",
              pointRadius: 3,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  drawBorder: false,
                  color: "#c4c4c4",
                },
              },
            ],
          },
          legend: {
            display: true,
            position: "top",
            align: "end",
            labels: {
              fontColor: "#33333",
              boxWidth: 10,
              padding: 5,
            },
          },
        }}
      />
    </div>
  );
}
