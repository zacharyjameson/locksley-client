import React, { Component } from "react";
import ApiContext from "./ApiContext";

class StockPage extends Component {
  state = {};

  static contextType = ApiContext;

  //PSQL DB CALL TO ADD STOCK

  render() {
    const qStock = this.context.query_values;
    const schfiftyfive = this.context.query_52week;
    const stock = this.context;

    return (
      <div className="Home">
        <section>
          <div className="homeinfo">
            Add this stock to your watchlist by hitting the "Add to Watchlist"
            button below, or search for a new stock above.
          </div>
          <div>
            <ul className="homegroup">
              <li className="stock homeitem">
                <h2>
                  {qStock.symbol} | {qStock.name}
                </h2>
                <h3 id={parseFloat(qStock.percent_change) >= 0 ? "up" : "down"}>
                  ${parseFloat(qStock.close).toFixed(3)} (
                  {parseFloat(
                    stock.handlePosNeg(qStock.percent_change)
                  ).toFixed(3)}
                  )
                </h3>
                <div>Volume: {qStock.volume}</div>
                <div>
                  Previous Close: $
                  {parseFloat(qStock.previous_close).toFixed(3)}{" "}
                </div>
                <div>
                  52-Week: Low: {parseFloat(schfiftyfive.low).toFixed(3)} High:{" "}
                  {parseFloat(schfiftyfive.high).toFixed(3)}{" "}
                </div>
                <input
                  type="button"
                  onClick={stock.handleAddStock}
                  value="Add to Watchlist"
                  className="clearButton"
                />
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default StockPage;
