// StockInformationPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/StockInformationPage.css'; // Import CSS file

const StockInformationPage = () => {
    const location = useLocation();
    const selectedStock = location.state;

    return (
        <div className="container">
            <h1 className="stock-name">{selectedStock}</h1>
            <p className="description">Stock description goes here...</p>
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
