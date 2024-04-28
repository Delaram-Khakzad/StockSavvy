// StockInformationPage.js
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/StockInformationPage.css'; // Import CSS file

const StockInformationPage = () => {
    const location = useLocation();
    const prevState = location.state;

    const selectedStock = prevState && prevState.stock ? prevState.stock.toUpperCase() : 'CAV.AX';

    const [stockDescription, setStockDescription] = useState('Loading Stock Description...');
    const [stockAIRecommendation, setStockAIRecommendation] = useState('Loading Stock AI Recommendation...');

    useEffect(() => {
        // Fetch stock description and graph data
        axios.get(`http://127.0.0.1:5000/api/stock/${selectedStock}/summary`)
        .then((response) => {
            setStockDescription(response.data);
        })
        .catch((error) => {
            // remove the description and show error message
            document.querySelector('.description').style.display = 'none';
            // setStockDescription('Failed to fetch general stock description');
            console.error('Error fetching stock description: ', error);
        });

        axios.get(`http://127.0.0.1:5000/api/summarize_recomendations/${selectedStock}`)
        .then((response) => {
            setStockAIRecommendation(response.data.summary);
        }).catch((error) => {
            setStockAIRecommendation('Failed to fetch stock recommendation');
            console.error('Error fetching stock recommendation: ', error);
        });
    },[selectedStock]);


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
            <p className="description">{stockAIRecommendation}</p>
            <div className="news-links">
                {/* <h2>Related News</h2>
                <a href="#">News Article 1</a>
                <p>Short preview of the news article...</p>
                <a href="#">News Article 2</a>
                <p>Short preview of the news article...</p> */}
                {/* Add more news articles if needed */}
                <img src={`http://127.0.0.1:5000/api/stock/${selectedStock}/graph`} alt="Stock Graph" />
            </div>
            
        </div>
    );
}

export default StockInformationPage;
