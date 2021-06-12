import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiContext from "./ApiContext";

class Searchbar extends Component {
  state = {};

  static contextType = ApiContext;
  
  render() {
    const savedStocks = this.context;
    const handleStockQuery = this.context;
    const stocks = this.context;

    return (
      <div className="Searchbar">
        <header>
              <h1>
                <Link to="/">Locksley</Link>
              </h1>
            </header>
        <nav role="navigation">
          <form onSubmit={stocks.handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              id="stock-search"
              onChange={handleStockQuery.handleStockQuery}
              required
            />
            <input type="submit" value="submit" /> |{" "}
            <Link to="/watchlist">Watchlist ({savedStocks.savedStocks.length})</Link>
          </form>
          <p>Search Limit: 8 per minute</p>
        </nav>
      </div>
    );
  }
}

export default Searchbar;
