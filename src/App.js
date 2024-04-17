//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stock from './components/StockDetails';
import RecommendationList from './components/RecomendationList';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


function App() {
    const [stockData, setStockData] = useState({});
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetchStockData();
        fetchRecommendations();
    }, []);

    const instance = axios.create({baseURL: 'http://127.0.0.1:5000'})

    const fetchStockData = () => {
        instance.get('/api/stock-data')
            .then(response => setStockData(response.data))
            .catch(error => console.error('Error fetching stock data:', error));
    };

    const fetchRecommendations = () => {
        instance.get('/api/recommendations')
            .then(response => setRecommendations(response.data))
            .catch(error => console.error('Error fetching recommendations:', error));
    };

    return (
        <div>
            <h1>Stock Recommendation System</h1>
            <Stock 
            stockData={stockData}/>
            <div>
                <h2>Recommended Stocks</h2>
                <RecommendationList recommendations={recommendations}/>
            </div>
        </div>
    );
}

export default App;
