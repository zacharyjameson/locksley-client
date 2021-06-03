import React, { Component } from "react";
import { Link } from "react-router-dom";

class Searchbar extends Component {
  state = {};
  render() {
    return (
      <div className="Searchbar">
        <nav role="navigation">
          <input type="text" placeholder="Search" />
          <button>Submit</button> | <Link to="/watchlist">Watchlist ()</Link>
        </nav>
      </div>
    );
  }
}

export default Searchbar;
