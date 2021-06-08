import React, { Component } from "react";
import { Link } from "react-router-dom";
import { countStocksPerSymbol } from "../stocks-helpers";
import ApiContext from "./ApiContext";

class Searchbar extends Component {
  state = {};

  static contextType = ApiContext;
  render() {

    const savedStocks = this.context;
    const uniqueSymbols = countStocksPerSymbol(savedStocks);

    return (
      <div className="Searchbar">
        <nav role="navigation">
          <input type="text" placeholder="Search" />
          <button>Submit</button> | <Link to="/watchlist">Watchlist ({uniqueSymbols.length})</Link>
        </nav>
      </div>
    );
  }
}

export default Searchbar;
