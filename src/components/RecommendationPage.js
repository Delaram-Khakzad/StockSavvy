// RecommendationPage.js
import React, { useState, useRef } from 'react';
import '../styles/RecommendationPage.css'; // Import CSS file
import { Drawer, useMediaQuery, useTheme, Paper, Avatar, Typography, Stack, AppBar, Toolbar, styled, Button, Grid, ToggleButton, ToggleButtonGroup, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const industries = ['Food', 'Mining and Minerals', 'Oil and Petroleum Products', 'Textiles, Apparel & Footwear', 'Consumer Durables', 'Chemicals', 'Drugs, Soap, Perfumes, Tobacco', 'Construction', 'Steel', 'Fabricated Products', 'Machinery', 'Automobiles', 'Transportation', 'Utilities', 'Retail', 'Financial Services', 'Other'];

const RecommendationPage = () => {

    const navigate = useNavigate();

    const navigateToStockInfo = (stock) => {
        navigate('/stock-info', { state: { stock: stock } });
    };

    const location = useLocation();
    const previousState = location.state;
    // trim whitespace
    const previousUserInput = previousState && previousState.recommendation.trim() ? previousState.recommendation : '';

    const [recommendations, setRecommendations] = useState([]);

    const navigateToRecommendation = () => {
        const sector = document.querySelector('select').value;
        const idx = industries.indexOf(sector);
        axios.post(`http://127.0.0.1:5000/api/recommendations/${idx}/3`, { text: userInput })
        .then(response => {
            setRecommendations(response.data);
        }).catch(error => {
            console.error('Failed to fetch recommendation', error);
        });
    }

    const [userInput, setUserInput] = useState(previousUserInput || '');

    return (
        <div className="container">
            <div className="filters">
                <h1>Recommendations</h1>
                {/* Place holders for filters */}
                <div className="filter-group">
                    <label>Choose Sector Bias</label>
                    <select label='industrySelector'>
                        {industries.map((industry, index) => (
                            <option key={index} value={industry}>{industry}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="input-text">
                <label>Recommendation Prompt</label>
                <textarea rows="4" placeholder="Recommend stocks similar to [stock_name]..." defaultValue={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') navigateToRecommendation()}}></textarea>
            </div>
            <div>
                <Button variant="contained" sx={{ fontSize: '16px', fontWeight: 'bold', backgroundColor: '#2362a5', color: '#fff', padding: '10px 20px', borderRadius: '5px', '&:hover': { backgroundColor: '#0056b3' } }} onClick={navigateToRecommendation}>
                    Get Recommendations
                </Button>
            </div>
            <Divider />
            <div className="result">
                <h2>Recommendations</h2>
                {recommendations.map((recommendation) => (
                    <div className="recommendation" key={recommendation.symbol}>
                        <h3>{recommendation.symbol}</h3>
                        <p>{recommendation.name}</p>
                        <Button variant="contained" sx={{ fontSize: '16px', fontWeight: 'bold', backgroundColor: '#2362a5', color: '#fff', padding: '10px 20px', borderRadius: '5px', '&:hover': { backgroundColor: '#0056b3' } }} onClick={() => navigateToStockInfo(recommendation.symbol)}>
                            View Stock Information
                        </Button>
                    </div>)
                    )
                }
            </div>
        </div>
    );
}

export default RecommendationPage;
