import React, { Component } from "react";
import config from "../config";
import ApiContext from "./ApiContext";
import WatchStocks from "./WatchStocks";

class Watchlist extends Component {
  state = {};

  static contextType = ApiContext;

  handleClear = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    };

    fetch(`${config.API_ENDPOINT}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Whoops! Something went wrong. Please try again later."
          );
        }
      })
      .then(() => {
        this.context.fetchSavedData();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  render() {
    const { savedStocks = [] } = this.context;

    return (
      <div className="Home">
        <section>
          <h1 className="homeinfo">Watchlist</h1>
          <div className="homeinfo">
            All of the stocks you have added to your watchlist appear here, in
            your watchlist. Click the remove button to get rid of a stock from
            this list
          </div>{" "}
          <div className="homeinfo">
            <em>....but remember, stonks only go up!</em>
          </div>
          <div>
            <ul className="homegroup">
              {savedStocks.map((savedStock) => {
                return (
                  <li
                    key={savedStock.id}
                    id={savedStock.stock_name}
                    className="homeitem stock"
                  >
                    <WatchStocks
                      name={savedStock.stock_name}
                      symbol={savedStock.stock_symbol}
                      volume={savedStock.stock_volume}
                      open={savedStock.stock_open}
                      close={savedStock.stock_close}
                      previous_close={savedStock.stock_previous_close}
                      percent_change={savedStock.stock_percent_change}
                      fiftytwo_week_high={savedStock.fiftytwo_week_high}
                      fiftytwo_week_low={savedStock.fiftytwo_week_low}
                    />
                  </li>
                );
              })}
            </ul>
            <input
              type="button"
              value="Clear Watchlist"
              onClick={this.handleClear}
              className={ savedStocks.length > 0 ? "clearButton" : "hidden"}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default Watchlist;
