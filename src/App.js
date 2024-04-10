import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [stockData, setStockData] = useState({});
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetchStockData();
        fetchRecommendations();
    }, []);

    const fetchStockData = () => {
        axios.get('/api/stock-data')
            .then(response => setStockData(response.data))
            .catch(error => console.error('Error fetching stock data:', error));
    };

    const fetchRecommendations = () => {
        axios.get('/api/recommendations')
            .then(response => setRecommendations(response.data))
            .catch(error => console.error('Error fetching recommendations:', error));
    };

    return (
        <div>
            <h1>Stock Recommendation System</h1>
            <div>
                <h2>Stock Data</h2>
                <p>Symbol: {stockData.symbol}</p>
                <p>Name: {stockData.name}</p>
                <p>Price: {stockData.price}</p>
                <p>Change: {stockData.change}</p>
                <p>Percent Change: {stockData.percent_change}</p>
            </div>
            <div>
                <h2>Recommended Stocks</h2>
                <ul>
                    {recommendations.map(stock => (
                        <li key={stock.symbol}>{stock.name} - {stock.price}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
