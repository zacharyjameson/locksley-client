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
        if (!stock.status) {
          throw new Error("Could not retrieve stock. Please try again later.");
        }
        return stock.json();
      })
      .then((stockJson) => {
        if (stockJson.code) {
          return alert(
            `Please enter an accepeted stock ticker symbol i.e. MSFT, AAPL, TSLA, etc.`
          );
        } else {
          this.setState({
            query_values: stockJson,
            query_52week: stockJson.fifty_two_week,
          });
          this.props.history.push(`/stock/${query}`);
        }
      });
  };

  handleRefresh = (e) => {
    e.preventDefault();

    const getOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    this.state.savedStocks.map((savedStock) => {
      const url = `${config.STOCK_API_URL}&symbol=${savedStock.stock_symbol}`;
      console.log(url);
      fetch(url, getOptions)
        .then((res) => {
          if (!res.status) {
            alert(
              "One or more of the stocks couldn't be retrieved. Please try again later."
            );
          }
          return res.json();
        })
        .then((stockJson) => {
          if (stockJson.code) {
            return alert(
              "One or more of the stocks couldn't be retrieved. Please try again later."
            );
          } else {
            const removed = savedStock.stock_symbol;
            const requestOptions = {
              method: "DELETE",
              headers: {
                "content-type": "application/json",
              },
            };
            fetch(`${config.API_ENDPOINT}/${removed}`, requestOptions)
              .then((res) => {
                if (res.status === 204) return res;
              })
              .catch((error) => {
                console.error({ error });
              });
            this.setState({
              query_values: stockJson,
              query_52week: stockJson.fifty_two_week,
            });
          }
        })
        .then(() => {
          this.handleRefreshAddStock();
        });
    });
    this.fetchSavedData();
  };

  handleRemove = () => {
    const removed = this.props.symbol;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    };
    fetch(`${config.API_ENDPOINT}/${removed}`, requestOptions)
      .then((res) => {
        if (res.status === 204) return res;
      })
      .then(() => {
        this.context.fetchSavedData();
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  handleRefreshAddStock = () => {
    const {
      symbol,
      name,
      volume,
      close,
      open,
      previous_close,
      percent_change,
    } = this.state.query_values;
    const { high, low } = this.state.query_52week;

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        stock_symbol: `${symbol}`,
        stock_name: `${name}`,
        stock_volume: `${volume}`,
        stock_previous_close: `${previous_close}`,
        stock_percent_change: `${percent_change}`,
        stock_close: `${close}`,
        stock_open: `${open}`,
        fiftytwo_week_high: `${high}`,
        fiftytwo_week_low: `${low}`,
      }),
    };

    fetch(`${config.API_ENDPOINT}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Whoops! Please try again later.");
        }
        return res.json();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  handleRefreshClear = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    };

    fetch(`${config.API_ENDPOINT}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Whoops! Something went wrong. Please try again later."
          );
        }
      })
      .then(() => {
        this.fetchSavedData();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  handleAddStock = (e) => {
    e.preventDefault();

    const {
      symbol,
      name,
      volume,
      close,
      open,
      previous_close,
      percent_change,
    } = this.state.query_values;
    const { high, low } = this.state.query_52week;

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        stock_symbol: `${symbol}`,
        stock_name: `${name}`,
        stock_volume: `${volume}`,
        stock_previous_close: `${previous_close}`,
        stock_percent_change: `${percent_change}`,
        stock_close: `${close}`,
        stock_open: `${open}`,
        fiftytwo_week_high: `${high}`,
        fiftytwo_week_low: `${low}`,
      }),
    };

    fetch(`${config.API_ENDPOINT}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Whoops! Please try again later.");
        }
        return res.json();
      })
      .then((res) => {
        this.props.history.push("/watchlist");
        this.fetchSavedData();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  handleClear = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    };

    fetch(`${config.API_ENDPOINT}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Whoops! Something went wrong. Please try again later."
          );
        }
      })
      .then(() => {
        this.fetchSavedData();
      })
      .catch((error) => {
        console.log("Error: ", error);
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
      handleClear: this.handleClear,
      handleAddStock: this.handleAddStock,
      handleRefresh: this.handleRefresh,
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
