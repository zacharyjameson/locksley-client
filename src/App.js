import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Searchbar from "./components/Searchbar";
import StockPage from "./components/StockPage";
import Watchlist from "./components/Watchlist";

class App extends Component {
  state = {};

  renderMainRoutes() {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route path="/watchlist" component={Watchlist} />
        <Route path="/info" component={StockPage} />
      </>
    );
  }

  render() {
    return (
      <div className="App_main">
        <main>
          <Searchbar />
          <header>
            <h1><Link to="/">Locksley</Link></h1>
          </header>
          {this.renderMainRoutes()}
        </main>
      </div>
    );
  }
}

export default App;
