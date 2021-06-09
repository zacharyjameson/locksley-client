import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import ApiContext from "./ApiContext";

class Home extends Component {
  state = {};

  static contextType = ApiContext;

  render() {
    const data = [["Data", "Close Price"]];
    const { meta = [] } = this.context;
    const { spy_data = [] } = this.context;
    const lastPrice = this.context.lastPrice;
    const oldPrice = this.context.oldPrice;
    console.log(oldPrice);

    const lineColor = lastPrice > oldPrice ? '#1DB954' : '#FF0000';
    console.log(lineColor);

    const createData = (info) => {
      info.map((stock) => {
        data.splice(1, 0, [new Date(stock.datetime), parseFloat(stock.close)]);
      })
      return data;
    }

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
                    width={"100%"}
                    height={"400px"}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={createData(spy_data)}
                    options={{
                      title: `${meta.symbol} | Last Close Price: ${lastPrice}`,
                      hAxis: {
                        title: "Date",
                      },
                      vAxis: {
                        title: "Close Price",
                      },
                      colors: [`${lineColor}`]
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
