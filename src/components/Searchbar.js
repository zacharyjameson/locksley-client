import React, { Component } from "react";
import { Link } from "react-router-dom";
import { countStocksPerSymbol } from "../stocks-helpers";
import ApiContext from "./ApiContext";

class Searchbar extends Component {
  state = {};

  static contextType = ApiContext;
  
  render() {
    const savedStocks = this.context;
    const handleStockQuery = this.context;
    const stocks = this.context;
    const uniqueSymbols = countStocksPerSymbol(savedStocks);

    return (
      <div className="Searchbar">
        <nav role="navigation">
          <form onSubmit={stocks.handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              id="stock-search"
              onChange={handleStockQuery.handleStockQuery}
              required
            />
            <Link to={`/stock/${stocks.query}`}><input type="submit" value="submit" /></Link> |{" "}
            <Link to="/watchlist">Watchlist ({uniqueSymbols.length})</Link>
          </form>
          <p>Search Limit: 8 per minute</p>
        </nav>
      </div>
    );
  }
}

export default Searchbar;
