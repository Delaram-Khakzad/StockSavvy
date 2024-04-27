// StockInformationPage.js
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/StockInformationPage.css'; // Import CSS file

const StockInformationPage = () => {
    const location = useLocation();
    var selectedStock = location.state.stock;

    if (!selectedStock) {
        selectedStock = 'AAPL';
    }

    const [stockDescription, setStockDescription] = useState('Loading Stock Description...');

    useEffect(() => {
        axios.get(`https://api.iextrading.com/1.0/stock/${selectedStock}/company`)
        .then((response) => {
            setStockDescription(response.data.description);
        })
        .catch((error) => {
            console.error('Error fetching stock description: ', error);
        });
    });


    return (
        <div className="container">
            <h1 className="stock-name">{selectedStock}</h1>
            <p className="description">{stockDescription}</p>
            <div className="graph">
                {/* Graph component goes here... */}
            </div>
            <div className="figure">
                {/* Figure component goes here... */}
            </div>
            <p className="description">Additional description goes here...</p>
            <div className="news-links">
                {/* <h2>Related News</h2>
                <a href="#">News Article 1</a>
                <p>Short preview of the news article...</p>
                <a href="#">News Article 2</a>
                <p>Short preview of the news article...</p> */}
                {/* Add more news articles if needed */}
            </div>
        </div>
    );
}

export default StockInformationPage;
