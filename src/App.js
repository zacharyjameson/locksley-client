import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ApiContext from "./components/ApiContext";
import Home from "./components/Home";
import Searchbar from "./components/Searchbar";
import StockPage from "./components/StockPage";
import Watchlist from "./components/Watchlist";
import config from "./config";
import "./App.css";
import { useHistory } from "react-router-dom";

class App extends Component {
  state = {
    query: "",
    query_values: [],
    spy: [],
    savedStocks: [],
    meta: [],
    spy_data: [],
    lastPrice: [],
    oldPrice: [],
  };
  
  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}`),
      fetch(`${config.STOCK_API_URL}&symbol=SPY`),
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

  handleStockQuery = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const query = this.state.query;
    const url = `${config.STOCK_API_URL}&symbol=${query}`;

    fetch(url)
      .then((stock) => {
        if (!stock.status === 200) {
          throw new Error("Could not retrieve stock. Please try again later.");
        }
        return stock.json();
      })
      .then((stockJson) => {
        this.setState({
          query_values: stockJson.values,
        })

        console.log("test");
        console.log(this.state.query_values);
        console.log(stockJson.values);
      });
  };

  renderMainRoutes() {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route path="/stock/:symbol" component={StockPage} />
        <Route path="/watchlist" component={Watchlist} />
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
      oldPrice: this.state.oldPrice,
      handleStockQuery: this.handleStockQuery,
      handleSubmit: this.handleSubmit,
      query: this.state.query
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
