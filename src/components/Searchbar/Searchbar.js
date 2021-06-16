import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFortAwesomeAlt } from "@fortawesome/free-brands-svg-icons";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

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
          <Link to="/" className="icon">
            <div className="titleGroup">
              <div className="titleItem">
                <FontAwesomeIcon icon={faFortAwesomeAlt} size="3x" />
              </div>
              <h1 className="title titleItem">
                Locksley <br />
                Finance
              </h1>
            </div>
          </Link>
        </div>
        <div className="navItem middle">
          <form onSubmit={stocks.handleSubmit}>
            <input
              type="search"
              id="stock-search"
              placeholder="MSFT, CRWD, etc."
              onChange={handleStockQuery.handleStockQuery}
              required
            />
            <input hidden type="submit" value="submit" />
            <p className="sub">Search Limit: 8/min</p>
          </form>
        </div>
        <div className="navItem watchlist end">
          <Link to="/watchlist">
            <div className="folderGroup">
              <div className="folderItem watchItem"> Watchlist | </div>
              <div className="folderItem watchItem">
                <FontAwesomeIcon
                  icon={faFolder}
                  size="2x"
                  className="folderClosed"
                />
                <FontAwesomeIcon
                  icon={faFolderOpen}
                  size="2x"
                  className="folderOpen"
                />
              </div>{" "}
              <div className="folderItem">
                ({savedStocks.savedStocks.length})
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Searchbar;
