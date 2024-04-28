// RecommendationPage.js
import React, { useState, useRef } from 'react';
import '../styles/RecommendationPage.css'; // Import CSS file
import {Drawer, useMediaQuery, useTheme, Paper, Avatar, Typography, Stack, AppBar, Toolbar, styled, Button, Grid, ToggleButton, ToggleButtonGroup, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';


const RecommendationPage = () => {
    const [stockSymbol, setStockSymbol] = useState();
const [recommendation, setRecommendation] = useState();

const navigate = useNavigate();

const navigateToStockInfo = () => {
    navigate('/stock-info', { state: {stock: stockSymbol} });
};

const navigateToRecommendation = () => {
    navigate('/recommendation', { state: {recommendation: recommendation} });
}

    const location = useLocation();
    const previousState = location.state;
    const previousUserInput = previousState && previousState.recommendation ? previousState.recommendation : '';

    const numFilters = 1;
    const filterOptions = ['option1', 'option2'];
    const filterRefs = useRef(Array(numFilters).fill().map(() => React.createRef()));
    

    const [userInput, setUserInput] = useState(previousUserInput || '');

    return (
        <div className="container">
            <div className="filters">
                <h1>Recommendations</h1>
                {/* Place holders for filters */}
                <div className="filter-group">
                    <label>Choose Sector(s)</label>
                    <select>
                        <option value="option1"> 1 </option>
                        <option value="option2"> 2 </option>
                        <option value="option2"> 3 </option>
                    </select>
                </div>
            </div>
            <div className="input-text">
                <label>Enter criteria for recommendation</label>
                <textarea rows="4" placeholder="Your text here ..."></textarea>
            </div>
            <div> 
            <Button variant="contained" sx={{ fontSize: '16px', fontWeight: 'bold', backgroundColor: '#2362a5', color: '#fff', padding: '10px 20px', borderRadius: '5px', '&:hover': { backgroundColor: '#0056b3' } }}>
                Get Recommendations
            </Button>
            </div>
            <Divider/>
            <div className="result">
                {/* Space to show resulting text */}
                <div> 
                    <button onClick={navigateToStockInfo}>Recommendation # 1</button>
                </div>
                <div> 
                    <button onClick={navigateToStockInfo}>Recommendation # 2</button>
                </div>
                <div> 
                    <button onClick={navigateToStockInfo}>Recommendation # 3</button>
                </div>
            </div>
        </div>
    );
}

export default RecommendationPage;
