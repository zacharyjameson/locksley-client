import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ApiContext from "./components/ApiContext";
import Home from "./components/Home";
import Searchbar from "./components/Searchbar";
import StockPage from "./components/StockPage";
import Watchlist from "./components/Watchlist";
import config from "./config";

class App extends Component {
  state = {
    query: "",
    spy: [],
    savedStocks: [],
    meta: [],
  };

  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}`),
      fetch(
        "https://api.twelvedata.com/time_series?symbol=SPY&interval=1day&apikey=1d3ecd525942497a8c4fc10ab430d84e&outputsize=7"
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
        });
        console.log(this.state.savedStocks);
        console.log(this.state.spy);
        console.log(spy.meta);
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
