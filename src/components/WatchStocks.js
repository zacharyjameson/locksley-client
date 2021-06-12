import React, { Component } from "react";
import ApiContext from "./ApiContext";

class WatchStocks extends Component {
  state = {};

  static contextType = ApiContext;

  render() {
    const contextual = this.context;
    const { name, symbol, volume, open, close, percent_change, previous_close, fiftytwo_week_high, fiftytwo_week_low } = this.props;

    return (
      <div>
        <h2>
          {symbol} | {name} | $
          {parseFloat(close).toFixed(3)} (
          {contextual.handlePosNeg(percent_change)})
        </h2>
        <div>Volume: {volume}</div>
        <div>
          Previous Close: $
          {parseFloat(previous_close).toFixed(3)}{" "}
        </div>
        <div>
          52-Week: Low: {parseFloat(fiftytwo_week_low).toFixed(3)}{" "}
          High: {parseFloat(fiftytwo_week_high).toFixed(3)}{" "}
        </div>
      </div>
    );
  }
}

export default WatchStocks;
