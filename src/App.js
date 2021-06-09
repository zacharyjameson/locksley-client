import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ApiContext from "./components/ApiContext";
import Home from "./components/Home";
import Searchbar from "./components/Searchbar";
import StockPage from "./components/StockPage";
import Watchlist from "./components/Watchlist";
import config from "./config";
import "./App.css";

class App extends Component {
  state = {
    query: "",
    spy: [],
    savedStocks: [],
    meta: [],
    spy_data: [],
    lastPrice: [],
    oldPrice: []
  };

  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}`),
      fetch(
        "https://api.twelvedata.com/time_series?symbol=SFTBY&interval=1day&apikey=1d3ecd525942497a8c4fc10ab430d84e&outputsize=14"
      ),
    ])
      .then(([savedStocksRes, spyRes]) => {
        if (!savedStocksRes.ok)
          return savedStocksRes.json().then((e) => Promise.reject(e));
        if (!spyRes.ok) return spyRes.json((e) => Promise.reject(e));

        return Promise.all([savedStocksRes.json(), spyRes.json()]);
      })
      .then(([savedStocks, spy]) => {
        this.setState({
          savedStocks: savedStocks,
          spy: spy,
          meta: spy.meta,
          spy_data: spy.values,
          lastPrice: spy.values[0].close,
          oldPrice: spy.values[13].close,
        });
        console.log(this.state.lastPrice);
        console.log(this.state.spy_data);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

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
    const value = {
      savedStocks: this.state.savedStocks,
      spy: this.state.spy,
      meta: this.state.meta,
      spy_data: this.state.spy_data,
      lastPrice: this.state.lastPrice,
      oldPrice: this.state.oldPrice
    };

    return (
      <ApiContext.Provider value={value}>
        <div className="App_main">
          <main>
            <Searchbar />
            <header>
              <h1>
                <Link to="/">Locksley</Link>
              </h1>
            </header>
            {this.renderMainRoutes()}
          </main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
