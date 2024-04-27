// HomePage.js
import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import '../styles/HomePage.css'; // Import CSS file

const HomePage = () => {
    const [stockSymbol, setStockSymbol] = useState('');
    const [recommendation, setRecommendation] = useState('');

    const navigate = useNavigate();

    const navigateToStockInfo = (e) => {
        if (e.key === 'Enter') {
            navigate('/stock-info', { state: {stock: stockSymbol} });
        }
    };

    const navigateToRecommendation = (e) => {
        if (e.key === 'Enter') {
            navigate('/recommendation', { state: {recommendation: recommendation} });
        }
    }

    return (
        <div className="container">
            <div className="hero">
                <h1>Welcome to Stock Savvy</h1>
            </div>
            <div className="input-container">
                <div className="input-group">
                    <input type="text" placeholder="Enter stock symbol for specific information" onChange={(e) =>setStockSymbol(e.target.value)} onKeyDown={navigateToStockInfo}/>
                    <Link to="/stock-info" state={{stock: stockSymbol}}>
                        <button>Get Stock Info</button>
                    </Link>
                </div>
                <div className="input-group">
                    <input type="text" placeholder="Enter criteria for stock recommendation" onChange={(e) =>setRecommendation(e.target.value)} onKeyDown={navigateToRecommendation}/>
                    <Link to="/recommendation" state={{recommendation: recommendation}}>
                        <button>Get Recommendation</button>
                    </Link>
                </div>
            </div>
            <div className="trending-stocks">
                {/* Display trending stock information */}
                <div className="trending-stock">
                    <h3>Trending Stock 1</h3>
                    <p>Stock information goes here...</p>
                </div>
                <div className="trending-stock">
                    <h3>Trending Stock 2</h3>
                    <p>Stock information goes here...</p>
                </div>
                <div className="trending-stock">
                    <h3>Trending Stock 3</h3>
                    <p>Stock information goes here...</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
