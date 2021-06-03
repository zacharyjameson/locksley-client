import React, { Component } from "react";
import { Chart } from "react-google-charts";

class StockPage extends Component {
  state = {};
  render() {
    return (
      <div className="StockPage">
        <section>
          <header>Individual Stock Page</header>
          <div>
            <p>
              <a href="#">Click to Refresh Data</a>
            </p>
            <ul>
              <li>
                <Chart
                  width={500}
                  height={350}
                  chartType="CandlestickChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ["Day:", "", "open", "close", "high"],
                    ["2021-06-02", 124.85, 124.895, 124.94, 125.00],
                    ["2021-06-02", 124.74, 124.96, 124.895, 124.99],
                    ["Wed", 124.64870, 124.88500, 124.96500, 125.05980],
                    ["Thu", 124.85, 124.895, 124.94, 125.00],
                    ["Fri", 124.85, 124.895, 124.94, 125.00],
                    ["Sat", 124.85, 124.895, 124.94, 125.00]
                  ]}
                  options={{
                    legend: "none",
                    bar: { groupWidth: "50%" }, // Remove space between bars.
                    candlestick: {
                      fallingColor: { strokeWidth: 0, fill: "#FF1800" }, // red
                      risingColor: { strokeWidth: 0, fill: "#1DB954" }, // green
                    },
                    title: "S&P500",
                    hAxis: {
                      minValue: 0,
                    },
                    vAxis: {
                      format: "currency"
                    },
                  }}
                />
                <button type="submit">Add to Watchlist</button>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default StockPage;
