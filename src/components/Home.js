import React, { Component } from "react";
import ApiContext from "./ApiContext";

class Home extends Component {
  state = {};

  static contextType = ApiContext;

  render() {
    const spy = this.context.spy;
    const dji = this.context.dji;
    const schfiftyfiveSPY = this.context.schfiftyfiveSPY;
    const schfiftyfiveDJI = this.context.schfiftyfiveDJI;
    const stock = this.context;

    const updog = parseFloat(spy.percent_change) >= 0 ? "up" : "down";
    const downdog = parseFloat(dji.percent_change) >= 0 ? "up" : "down";

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
      <div className="Home">
        <section>
          <div className="homeinfo">
            <h1 className="mobileTitle">Locksley</h1>
          </div>
          <div className="homeinfo">
            Locksley gives you a simple, but no-nonsense view of your favorite
            stocks; including current price and recent close data as well as
            historical data over the last 52 weeks, all which can be saved in
            your favorite list. <br />
            Get started by searching for a stock, by ticker symbol, and press
            enter to begin your search!
          </div>
          <div>
            <ul className="homegroup">
              <li>
                <div className="stock homeitem">
                  <h2>
                    {spy.symbol} | {spy.name}
                  </h2>
                  <h3 id={updog}>
                    ${parseFloat(spy.close).toFixed(3)} (
                    {stock.handlePosNeg(
                      parseFloat(spy.percent_change).toFixed(3)
                    )}
                    )
                  </h3>
                  <div>
                    Open: {numberWithCommas(parseFloat(spy.open).toFixed(3))}
                  </div>
                  <div>Volume: {spy.volume}</div>
                  <div>
                    Previous Close: $
                    {parseFloat(stock.spy.previous_close).toFixed(3)}{" "}
                  </div>
                  <div>
                    52-Week: <br />Low: {parseFloat(schfiftyfiveSPY.low).toFixed(3)}{" "}
                    High: {parseFloat(schfiftyfiveSPY.high).toFixed(3)}{" "}
                  </div>
                </div>
              </li>
              <li>
                <div className="stock homeitem">
                  <h2>
                    {dji.symbol} | {dji.name}
                  </h2>
                  <h3 id={downdog}>
                    ${numberWithCommas(parseFloat(dji.close).toFixed(3))} (
                    {stock.handlePosNeg(
                      parseFloat(dji.percent_change).toFixed(3)
                    )}
                    )
                  </h3>
                  <div>
                    Open: {numberWithCommas(parseFloat(dji.open).toFixed(3))}
                  </div>
                  <div>Volume: {dji.volume}</div>
                  <div>
                    Previous Close: $
                    {numberWithCommas(
                      parseFloat(dji.previous_close).toFixed(3)
                    )}{" "}
                  </div>
                  <div>
                    52-Week: <br /> Low: {parseFloat(schfiftyfiveDJI.low).toFixed(3)}{" "}
                    High: {parseFloat(schfiftyfiveDJI.high).toFixed(3)}{" "}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
