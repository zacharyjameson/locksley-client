export const countStocksPerSymbol = (stocks) => {
    console.log(stocks.dbStocks);
    const savedStocks = stocks.dbStocks;
    let unique = [...new Set(savedStocks.map(item => item.stock_symbol))];
    return unique;
}