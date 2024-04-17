//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockList from './components/StockList';
import RecommendationList from './components/RecomendationList';
import StockForm from './components/StockForm';

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
    const [recommendations, setRecommendations] = useState([]);
    const [stockNames, setStockNames] = useState([undefined, undefined]);

    useEffect(() => {
        // load stock names and recommendations
        axios.get('http://127.0.0.1:5000/api/all_stock_names')
            .then(response => setStockNames(response.data))
            .catch(error => console.error('Error fetching stock names:', error));
        axios.get('http://127.0.0.1:5000/api/recommendations')
            .then(response => setRecommendations(response.data))
            .catch(error => console.error('Error fetching recommendations:', error));
    }, []);


    // iterate over all stock names and fetch data for each
    return (
        <div>
            <h1>Stock Recommendation System</h1>
            <h2>Stock Data</h2>
            <StockList symbols={stockNames} />

            <div>
                <h2>Recommended Stocks</h2>
                <RecommendationList recommendations={recommendations} />
            </div>
            <StockForm s />
        </div>
    );
}

export default App;
