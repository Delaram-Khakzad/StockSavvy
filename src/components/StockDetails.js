// holds stock data
function Stock({ stockData }) {
    return (
        <div>
            <h2>Stock Data</h2>
            <p>Symbol: {stockData.symbol}</p>
            <p>Name: {stockData.name}</p>
            <p>Price: {stockData.price}</p>
            <p>Change: {stockData.change}</p>
            <p>Percent Change: {stockData.percent_change}</p>
        </div>
    );
}

export default Stock;