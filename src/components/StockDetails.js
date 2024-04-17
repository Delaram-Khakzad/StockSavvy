import React, { useState, useEffect } from 'react';
import axios from 'axios';

// holds stock data
function StockDetails({ symbol }) {

    const [stockData, setStockData] = useState({'symbol': 'Loading...', 'name': 'Loading...', 'price': 'Loading...', 'change': 'Loading...', 'percent_change': 'Loading...'});

    useEffect(() => {
        if (!symbol) return;
        axios.get(`http://127.0.0.1:5000/api/stock/${symbol}`)
            .then(response => setStockData(response.data))
            .catch(error => console.error('Error fetching stock data:', error));
    },[symbol]);

    return (
        <div>
            <p>Symbol: {stockData.symbol}</p>
            <p>Name: {stockData.name}</p>
            <p>Price: {stockData.price}</p>
            <p>Change: {stockData.change}</p>
            <p>Percent Change: {stockData.percent_change}</p>
        </div>
    );
}

export default StockDetails;