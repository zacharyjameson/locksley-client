import React, { Component } from "react";
import config from "../config";
import ApiContext from "./ApiContext";

class StockPage extends Component {
  state = {};

  static contextType = ApiContext;

  //PSQL DB CALL TO ADD STOCK
  handleAddStock = (e) => {
    e.preventDefault();

    const { symbol, name, volume, close, open, previous_close, percent_change } = this.context.query_values;
    const { high, low } = this.context.query_52week;
    console.log(high);

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        stock_symbol: `${symbol}`,
        stock_name: `${name}`,
        stock_volume: `${volume}`,
        stock_previous_close: `${previous_close}`,
        stock_percent_change: `${percent_change}`,
        stock_close: `${close}`,
        stock_open: `${open}`,
        fiftytwo_week_high: `${high}`,
        fiftytwo_week_low: `${low}`
      }),
    };

    fetch(`${config.API_ENDPOINT}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Whoops! Please try again later.");
        }
        return res.json();
        
      })
      .then((res) => {
        console.log(this.context.savedStocks);
        this.props.history.push("/watchlist");
        this.context.fetchSavedData();
      })
      .catch((error) => {
        console.log("Error: ", error)
      })
  }

  render() {

    const qStock = this.context.query_values;
    const schfiftyfive = this.context.query_52week;
    const stock = this.context;

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
                <input type="button" onClick={this.handleAddStock} value="Add to Watchlist" />
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default StockPage;
