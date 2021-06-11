import React, { Component } from "react";
import { Chart } from "react-google-charts";
import ApiContext from "./ApiContext";

class StockPage extends Component {
  state = {};

  static contextType = ApiContext;

  render() {

    const qStock = this.context.query_values;
    const schfiftyfive = this.context.query_52week;
    const stock = this.context;
    console.log(stock);

    return (
      <div className="StockPage">
        <section>
          <div>
            <ul>
              <li>
                <h2>{qStock.symbol} | {qStock.name} | ${parseFloat(qStock.close).toFixed(3)} ({stock.handlePosNeg(qStock.percent_change)})</h2>
                <div>Volume: {qStock.volume}</div>
                <div>Previous Close: ${parseFloat(qStock.previous_close).toFixed(3)} </div>
                <div>52-Week: Low: {parseFloat(schfiftyfive.low).toFixed(3)} High: {parseFloat(schfiftyfive.high).toFixed(3)} </div>
                <button type="submit">Add to Watchlist</button>
                <div><a href="#">Click to Refresh Data</a></div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default StockPage;
