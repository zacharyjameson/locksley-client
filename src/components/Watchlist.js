import React, { Component } from "react";

class Watchlist extends Component {
  state = {};
  render() {
    return (
      <div className="Watchlist">
        <section>
          <header>Watchlist</header>
          <div>
            <p>
              <a href="#">Click to Refresh Data</a>
            </p>
            <ul>
              <li>
                <div>Generic data for S&P500</div>
                <button>Add to Watchlist</button>
              </li>
              <li>
                <div>Basic data for MSFT</div>
                <button>Add to Watchlist</button>
              </li>
              <li>
                <div>Basic data fro AAPL</div>
                <button>Add to Watchlist</button>
              </li>
              <li>
                <div>Basic data for VUG</div>
                <button>Add to Watchlist</button>
              </li>
              <li>
                <div>Basic data for NET</div>
                <button>Add to Watchlist</button>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Watchlist;
