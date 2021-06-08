import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import ApiContext from "./ApiContext";

class Home extends Component {
  state = {};

  static contextType = ApiContext;

  render() {

    const { meta = [] } = this.context;
    console.log(meta.symbol);
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
                    width={"600px"}
                    height={"400px"}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["date", "Close Price"],
                      [0, 0],
                      [1, 10],
                      [2, 23],
                      [3, 17],
                      [4, 18],
                      [5, 9],
                      [6, 11],
                      [7, 27],
                      [8, 33],
                      [9, 40],
                      [10, 32],
                      [11, 35],
                    ]}
                    options={{
                      title: `${meta.symbol}`,
                      hAxis: {
                        title: "Date",
                      },
                      vAxis: {
                        title: "Close Price",
                      },
                    }}
                    rootProps={{ "data-testid": "3" }}
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
