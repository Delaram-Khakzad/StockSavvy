// RecommendationPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecommendationPage.css'; // Import CSS file
import {Drawer, useMediaQuery, useTheme, Paper, Avatar, Typography, Stack, AppBar, Toolbar, styled, Button, Grid, ToggleButton, ToggleButtonGroup, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const RecommendationPage = () => {
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
                {/* <div className="filter-group">
                    <label>Filter 2</label>
                    <select>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Filter 3</label>
                    <select>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                </div> */}
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
                    <Link to="/stock-info">
                        <button>Recommendation # 1</button>
                    </Link>
                </div>
                <div> 
                    <Link to="/stock-info">
                        <button>Recommendation # 2</button>
                    </Link>
                </div>
                <div> 
                    <Link to="/stock-info">
                        <button>Recommendation # 3</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RecommendationPage;
