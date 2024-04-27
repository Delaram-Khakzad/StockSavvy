// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom'; // test 
import '../styles/HomePage.css'; // Import CSS file

const HomePage = () => {
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
