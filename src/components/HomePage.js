import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const [trendingStocks, setTrendingStocks] = useState([]);
        

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/trending_stocks')
            .then(response => setTrendingStocks(response.data))
            .catch(error => {
                alert('Failed to fetch stock data');  // Simple error handling
            });
    }, []);

    return (
        <div className="container">
            <div className="hero">
                <h1>Welcome to Stock Savvy</h1>
            </div>
            <div className="input-container">
                <div className="input-group">
                    <input type="text" placeholder="Enter stock symbol for specific information" />
                    <Link to="/stock-info">
                        <button>Get Stock Info</button>
                    </Link>
                </div>
                <div className="input-group">
                    <input type="text" placeholder="Enter criteria for stock recommendation" />
                    <Link to="/recommendation">
                        <button>Get Recommendation</button>
                    </Link>
                </div>
            </div>
            <div className="trending-stocks">
                <div className="trendingstocknames">
                {trendingStocks.map((trendingStock)=> (
                    
                    <div className="trendingstocknames">
                    <h3>{trendingStock}</h3>
                    </div>    
                
                )
                
            )}
                </div>
                {/* Additional stocks can be rendered similarly */}
            </div>
        </div>
    );
};

export default HomePage;
