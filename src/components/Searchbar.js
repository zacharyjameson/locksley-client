import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFortAwesomeAlt } from "@fortawesome/free-brands-svg-icons";
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
      <div className="Searchbar navGroup">
        <div className="navItem">
          <h1 className="title">
            <Link to="/">Locksley</Link>
          </h1>
          <Link to="/">
            <FontAwesomeIcon icon={faFortAwesomeAlt} size="2x" />
          </Link>
        </div>

        <div className="navItem middle">
          <form onSubmit={stocks.handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              id="stock-search"
              onChange={handleStockQuery.handleStockQuery}
              required
            />
            <input hidden type="submit" value="submit" />
            <br />
            <p className="sub">Search Limit: 8/min</p>
          </form>
        </div>
        <div className="navItem end">
          <Link to="/watchlist">
             Watchlist({savedStocks.savedStocks.length})
          </Link>
        </div>
      </div>
    );
  }
}

export default Searchbar;
