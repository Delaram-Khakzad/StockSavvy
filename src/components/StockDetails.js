import React, { useState, useEffect } from 'react';
import axios from 'axios';

// holds stock data
function StockDetails({ symbol }) {

    const [stockData, setStockData] = useState({'symbol': 'Loading...', 'name': 'Loading...', 'price': 'Loading...', 'change': 'Loading...', 'percent_change': 'Loading...'});

    useEffect(() => {
        if (!(typeof symbol === 'string')) return;
        axios.get(`https://stocksavvy.calebweb.me:8123/api/stock/${symbol}`)
            .then(response => setStockData(response.data))
            .catch(error => console.error('Error fetching stock data:', error));
    },[symbol]);

    return (
        <div>
            <p>Symbol: {stockData.symbol}</p>
            <p>Name: {stockData.name}</p>
            <p>Price: ${Number(stockData.price).toFixed(2)}</p>
            <p>Change: ${Number(stockData.change).toFixed(2)}</p>
            <p>Percent Change: {(stockData.percent_change*100).toFixed(2)}%</p>
        </div>
    );
}

export default StockDetails;