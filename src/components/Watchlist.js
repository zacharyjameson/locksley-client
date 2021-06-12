import React, { Component } from "react";
import ApiContext from "./ApiContext";
import WatchedStock from "./WatchedStock";

class Watchlist extends Component {
  state = {};

static contextType = ApiContext

  render() {
    const { savedStocks = [] } = this.context;
    const contextual = this.context;
    console.log(savedStocks);

    return (
      <div className="Watchlist">
        <section>
          <header>Watchlist</header>
          <div>
            <p>
              <a href="#">Click to Refresh Data</a>
            </p>
            <ul>
              {savedStocks.map((savedStock) => {
                return (
                  <li key={savedStock.stock_id} id={savedStock.stock_name}>
                    <WatchedStock 
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
          </div>
        </section>
      </div>
    );
  }
}

export default Watchlist;
