import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import ApiContext from "./ApiContext";

class Home extends Component {
  state = {};

  static contextType = ApiContext;

  render() {
    const close = this.context.currentPriceClose;
    const spy = this.context.spy;
    const dji = this.context.dji;
    const schfiftyfiveSPY = this.context.schfiftyfiveSPY;
    const schfiftyfiveDJI = this.context.schfiftyfiveDJI;
    const stock = this.context;

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
                <h2>{spy.symbol} | {spy.name} | ${parseFloat(spy.close).toFixed(3)} ({stock.handlePosNeg(spy.percent_change)})</h2>
                <div>Volume: {spy.volume}</div>
                <div>Previous Close: ${parseFloat(stock.spy.previous_close).toFixed(3)} </div>
                <div>52-Week: Low: {parseFloat(schfiftyfiveSPY.low).toFixed(3)} High: {parseFloat(schfiftyfiveSPY.high).toFixed(3)} </div>
              </li>
              <li>
                <h2>{dji.symbol} | {dji.name} | ${parseFloat(dji.close).toFixed(3)} ({stock.handlePosNeg(dji.percent_change)})</h2>
                <div>Volume: {dji.volume}</div>
                <div>Previous Close: ${parseFloat(dji.previous_close).toFixed(3)} </div>
                <div>52-Week: Low: {parseFloat(schfiftyfiveDJI.low).toFixed(3)} High: {parseFloat(schfiftyfiveDJI.high).toFixed(3)} </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
