// HomePage.js
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../styles/HomePage.css'; // Import CSS file
import {Typography, Grid} from '@mui/material';
import {IconButton } from '@mui/material';
import { DescriptionOutlined } from '@mui/icons-material';  
import PersonIcon from '@mui/icons-material/Person';
import GitHubIcon from '@mui/icons-material/GitHub';
import ShowChartIcon from '@mui/icons-material/ShowChart';

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
                <Grid item xs={6} sx={{padding: 0, marginBottom:4}}>
                <div className="trending-stock">
                        <h3>Trending Stock Graph</h3>
                        <p>Stock information goes here...</p>
                    </div>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item sx={{padding: 0}}>
                        <IconButton href='https://docs.google.com/document/d/1bLdFkhQTkY7gMkD5biFm1TxyMGv5jjKnrl88iXLnOY4/edit?usp=sharing' target="_blank">
                            <ShowChartIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item sx={{padding: 0}}>
                        <IconButton href='https://docs.google.com/document/d/1aV_1qDn5Q3rzd-ZJHfdxnv5sqz8tqS9n4nzHz_b7cGM/edit?usp=sharing' target="_blank">
                            <PersonIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item sx={{padding: 0}}>
                        <IconButton href='https://docs.google.com/document/d/1wAMFviuqRRDDYTjzpginnD6cF1P4LFU8AFwqCc3QT0Y/edit?usp=sharing' target="_blank">
                            <DescriptionOutlined fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item sx={{padding: 0}}>
                        <IconButton href="https://github.com/Delaram-Khakzad/StockSavvy" target="_blank">
                            <GitHubIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default HomePage;

