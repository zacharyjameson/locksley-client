export const countStocksPerSymbol = (stocks) => {
    console.log(stocks.savedStocks);
    const dbStocks = stocks.savedStocks;
    let unique = [...new Set(dbStocks.map(item => item.stock_symbol))];
    return unique;
}