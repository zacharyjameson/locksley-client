export const countStocksPerSymbol = (stocks) => {
  const dbStocks = stocks.savedStocks;
  let unique = [...new Set(dbStocks.map((item) => item.stock_symbol))];
  return unique;
};

export const deleteSingleStock = (stocks) => {
  const dbStocks = stocks.savedStocks;
  dbStocks.filter((stock) => stock.stock_symbol !== stocks);
};
