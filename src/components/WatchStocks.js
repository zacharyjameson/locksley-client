import React, { Component } from "react";
import ApiContext from "./ApiContext";
import config from "../config";

class WatchStocks extends Component {
  state = {};

  static contextType = ApiContext;

  handleRemove = (e) => {
    e.preventDefault();
    const removed = this.props.symbol;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    };
    fetch(`${config.API_ENDPOINT}/${removed}`, requestOptions)
      .then((res) => {
        if (res.status === 204) return res;
      })
      .then(() => {
        this.context.fetchSavedData();
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const contextual = this.context;
    const {
      name,
      symbol,
      volume,
      open,
      close,
      percent_change,
      previous_close,
      fiftytwo_week_high,
      fiftytwo_week_low,
    } = this.props;

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
      <div className="Home">
        <div>
          <h2>
            {symbol} | {name}
          </h2>
          <h3 id={parseFloat(percent_change) >= 0 ? "up" : "down"}>
            ${numberWithCommas(parseFloat(close).toFixed(3))} (
            {contextual.handlePosNeg(parseFloat(percent_change).toFixed(3))})
          </h3>
          <div>Open: {numberWithCommas(parseFloat(open).toFixed(3))}</div>
          <div>Volume: {volume}</div>
          <div>Previous Close: ${parseFloat(previous_close).toFixed(3)} </div>
          <div>
            52-Week: <br /> Low: {parseFloat(fiftytwo_week_low).toFixed(3)} High:{" "}
            {parseFloat(fiftytwo_week_high).toFixed(3)}{" "}
          </div>
          <input
            value="Remove"
            type="button"
            onClick={this.handleRemove}
            className="clearButton"
          />
        </div>
      </div>
    );
  }
}

export default WatchStocks;
