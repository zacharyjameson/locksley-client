import React, { Component } from "react";
import { Route } from "react-router-dom";
import ApiContext from "./components/ApiContext";
import Home from "./components/Home";
import Searchbar from "./components/Searchbar";
import StockPage from "./components/StockPage";
import Watchlist from "./components/Watchlist";
import config from "./config";
import "./App.css";
import { withRouter } from "react-router-dom";

class App extends Component {
  state = {
    query: "",
    query_52week: [],
    query_values: [],
    spy: [],
    dji: [],
    savedStocks: [],
    schfiftyfiveSPY: [],
    schfiftyfiveDJI: [],
  };

  componentDidMount() {
    this.fetchSavedData();
    this.fetchHomeData();
  }

  fetchHomeData = () => {
    Promise.all([fetch(`${config.STOCK_API_URL}&symbol=SPY,DJI`)])
      .then(([spyRes]) => {
        if (!spyRes.ok) return spyRes.json((e) => Promise.reject(e));
        return Promise.all([spyRes.json()]);
      })
      .then(([spy]) => {
        this.setState({
          spy: spy.SPY,
          dji: spy.DJI,
          schfiftyfiveSPY: spy.SPY.fifty_two_week,
          schfiftyfiveDJI: spy.DJI.fifty_two_week,
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  fetchSavedData = () => {
    Promise.all([fetch(`${config.API_ENDPOINT}`)])
      .then(([savedStocksRes]) => {
        if (!savedStocksRes.ok)
          return savedStocksRes.json().then((e) => Promise.reject(e));

        return Promise.all([savedStocksRes.json()]);
      })
      .then(([savedStocks]) => {
        this.setState({
          savedStocks: savedStocks,
        });
        console.log(savedStocks);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  // CALCULATE PERCENTAGE INCREASE OR DECREASE
  handleIncDec(origPrice, curPrice) {
    let number;
    let direction;
    if (curPrice >= origPrice) {
      number = ((curPrice - origPrice) / origPrice) * 100;
      direction = "+";
    } else {
      number = ((origPrice - curPrice) / origPrice) * 100;
      direction = "-";
    }
    return `${direction}${number.toFixed(2)}%`;
  }

  handlePosNeg(price) {
    let change;
    if (price >= 0) {
      change = "+";
    } else {
      change = "";
    }
    return `${change}${price}%`;
  }

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
        if (stock.code === 400) {
          throw new Error("Could not retrieve stock. Please try again later.");
        }
        return stock.json();
      })
      .then((stockJson) => {
        this.setState({
          query_values: stockJson,
          query_52week: stockJson.fifty_two_week,
        });
        this.props.history.push(`/stock/${query}`);
        console.log(this.state.query_values);
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
      dji: this.state.dji,
      schfiftyfiveSPY: this.state.schfiftyfiveSPY,
      schfiftyfiveDJI: this.state.schfiftyfiveDJI,
      handleStockQuery: this.handleStockQuery,
      handleSubmit: this.handleSubmit,
      handleIncDec: this.handleIncDec,
      handlePosNeg: this.handlePosNeg,
      fetchSavedData: this.fetchSavedData,
      query: this.state.query,
      query_values: this.state.query_values,
      query_52week: this.state.query_52week,
    };

    return (
      <ApiContext.Provider value={value}>
        <div className="App_main">
          <main>
            <Searchbar />
            {this.renderMainRoutes()}
          </main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default withRouter(App);
