import React, { Component } from "react";
import { Route } from "react-router-dom";
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
        </main>
      </div>
    );
  }
}

export default App;
