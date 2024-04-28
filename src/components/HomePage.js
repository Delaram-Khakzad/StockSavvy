// HomePage.js
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../styles/HomePage.css'; // Import CSS file
import {Drawer, useMediaQuery, useTheme, Paper, Avatar, Typography, Stack, AppBar, Toolbar, styled, Button, Grid, ToggleButton, ToggleButtonGroup, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const HomePage = () => {
    const [stockSymbol, setStockSymbol] = useState();
    const [recommendation, setRecommendation] = useState();

    const navigate = useNavigate();

    const navigateToStockInfo = () => {
        navigate('/stock-info', { state: {stock: stockSymbol} });
    };

    const navigateToRecommendation = () => {
        navigate('/recommendation', { state: {recommendation: recommendation} });
    }

    return (
        <div className="container">
            <Grid container spacing={1}>
                <Grid item xs={8} sx={{padding: 0}}>
                    <Grid item xs={12} sx={{padding: 0}}>
                        <div className="hero">
                            <h1>Welcome to Stock Savvy</h1>
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{padding: 0}}>
                        <div className="input-container">
                            <div className="input-group">
                                <input type="text" placeholder="Enter criteria for recommendation" onChange={(e) => setRecommendation(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') navigateToRecommendation()}}/>
                                <button onClick={navigateToRecommendation}>Get Recommendation</button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{padding: 0}}>
                        <div className="input-container">
                            <div className="input-group">
                                <input type="text" placeholder="Enter stock symbol for information" />
                                <button onClick={navigateToStockInfo}>Get Stock Information</button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={4} sx={{padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div className="input-group">
                        <div className="stockName">
                            <Typography variant="h5" fontWeight='bold' align="center">
                                Name 1
                            </Typography>
                        </div>
                        <button onClick={navigateToStockInfo}>Get Stock Information</button>
                        <div className="stockName">
                            <Typography variant="h5" fontWeight='bold' align="center">
                                Name 2
                            </Typography>
                        </div>
                        <button onClick={navigateToStockInfo}>Get Stock Information</button>
                        <div className="stockName">
                        <Typography variant="h5" fontWeight='bold' align="center">
                            Name 3
                        </Typography>
                        </div>
                        <button onClick={navigateToStockInfo}>Get Stock Information</button>
                    </div>
                </Grid>
                <Grid item xs={6} sx={{padding: 0}}>
                    <div className="trending-stock">
                        <h3>Trending Stock News</h3>
                        <p>Stock information goes here...</p>
                    </div>
                </Grid>
                <Grid item xs={6} sx={{padding: 0}}>
                <div className="trending-stock">
                        <h3>Trending Stock Graph</h3>
                        <p>Stock information goes here...</p>
                    </div>
                </Grid>
                <Grid item xs={3} sx={{padding: 0}}>
                    <Typography variant="subtitle1" fontWeight='bold' align="center">
                        Project info
                    </Typography>
                </Grid>
                <Grid item xs={3} sx={{padding: 0}}>
                    <Typography variant="subtitle1" fontWeight='bold' align="center">
                        Developers info
                    </Typography>
                </Grid>
                <Grid item xs={3} sx={{padding: 0}}>
                    <Typography variant="subtitle1" fontWeight='bold' align="center">
                        documentations
                    </Typography>
                </Grid>
                <Grid item xs={3} sx={{padding: 0}}>
                    <Typography variant="subtitle1" fontWeight='bold' align="center">
                        repo link
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default HomePage;

