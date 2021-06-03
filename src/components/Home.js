import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="Home">
        <section>
          <header>
            Locksley gives you a no-nonsense view of your favorite stocks;
            including current price, historical data over the last several
            weeks, all saved in your favorite list.
          </header>
          <div>
            <ul>
              <li>
                <Link to="/info">
                  <Chart
                    width={500}
                    height={350}
                    chartType="CandlestickChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["Day:", "", "open", "close", "high"],
                      ["2021-06-02", 124.85, 124.895, 124.94, 125.0],
                      ["2021-06-02", 124.74, 124.96, 124.895, 124.99],
                      ["Wed", 124.6487, 124.885, 124.965, 125.0598],
                      ["Thu", 124.85, 124.895, 124.94, 125.0],
                      ["Fri", 124.85, 124.895, 124.94, 125.0],
                      ["Sat", 124.85, 124.895, 124.94, 125.0],
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
                        format: "currency",
                      },
                    }}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
