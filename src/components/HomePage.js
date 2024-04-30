import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage.css';
import {Grid, Button} from '@mui/material';
import {IconButton } from '@mui/material';
import { DescriptionOutlined } from '@mui/icons-material';  
import PersonIcon from '@mui/icons-material/Person';
import GitHubIcon from '@mui/icons-material/GitHub';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const HomePage = () => {

    const [stockSymbol, setStockSymbol] = useState();
    const [recommendation, setRecommendation] = useState();

    const [displayStock, setDisplayStock] = useState('AAPL');

    const [newsArticles, setNewsArticles] = useState([]); // Array of news articles {score, title, url}

    const navigate = useNavigate();

    const navigateToStockInfo = (override) => {
        navigate('/stock-info', { state: { stock: override ? override : stockSymbol } });
    };

    const navigateToRecommendation = () => {
        navigate('/recommendation', { state: { recommendation: recommendation } });
    }

    const rotateStock = (override) => {
        const nextStock = trendingStocks[override];
        setDisplayStock(nextStock);
        setTimeout(rotateStock, 7500, (override + 1) % trendingStocks.length);
    };

    const [trendingStocks, setTrendingStocks] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/trending_stocks')
            .then(response => {
                setTrendingStocks(response.data);
                setDisplayStock(response.data[0]);
            })
            .catch(error => {
                console.log('Failed to fetch stock data', error);  // Simple error handling
            });
    },[]);

    useEffect(() => {
        if (trendingStocks.length > 0)
            rotateStock(0);
    },[trendingStocks]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/stock/${displayStock}/news`)
        .then(response => {
            setNewsArticles(response.data);
        }).catch(error => {
            console.log('Failed to fetch news articles', error);
        });
    },[displayStock]);

    return (
        <div className="container">
            <Grid container spacing={2}>
                <Grid item xs={8} sx={{ padding: 0 }}>
                    <Grid item xs={12} sx={{ padding: 0 }}>
                        <div className="hero">
                            <h1>Welcome to Stock Savvy</h1>
                        </div>
                    </Grid>
                    <Grid container sx={{ padding: 0 }}>
                        <Grid item xs={5} sx={{ padding: 0 }}>
                            <div className="input-container">
                                <div className="input-group">
                                    <input type="text" placeholder="Enter criteria for recommendation" onChange={(e) => setRecommendation(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') navigateToRecommendation() }} />
                                    <button onClick={navigateToRecommendation}>Get Recommendation</button>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={5} sx={{ padding: 0 }}>
                            <div className="input-container">
                                <div className="input-group">
                                    <input type="text" placeholder="Enter stock symbol for information" onChange={(e) => setStockSymbol(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') navigateToStockInfo() }} />
                                    <button onClick={() => navigateToStockInfo(stockSymbol)}>Get Stock Information</button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={3} sx={{alignContent: 'center', marginTop: 5, padding: '5px'}}>
                    <Grid container justifyContent="center" alignItems="center">
                        <h1>Trending Stocks</h1>
                        <div>
                            {trendingStocks.map((stock) => {
                                return (<div key={stock}>
                                    <Button onClick={() => navigateToStockInfo(stock)} startIcon={<ShowChartIcon/>} variant="text"
                                        sx={{
                                            fontSize: '30px',  
                                            fontWeight: stock === displayStock ? 'bold' : 'normal',
                                            color: stock === displayStock ? 'white' : '#0f2337',
                                            backgroundColor: stock === displayStock ? '#0f2337' : 'rgb(164, 162, 172)',
                                            '&:hover': {backgroundColor: '#0f2337', color: 'white'}}}
                                    >{stock}
                                    </Button>
                                </div>
                                );
                            })}
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{ padding: 0 }}>
                    <div className="trending-stock">
                        <h3>Trending Stock News</h3>
                        <div className="news-container">
                            {newsArticles.map((article) => {
                                return (
                                    <div key={article.url} style={{ marginBottom: '10px' }}>
                                        <NewspaperIcon style={{ marginRight: '5px' }} />
                                        <a href={article.url} target={'_blank'}>{article.title} </a>
                                        {/* <p>{article.score}</p> */}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6} sx={{padding: 0, marginBottom:4}}>
                <div className="trending-stock">
                        <h3>Trending Stock Graph</h3>
                        <div className="img_container">
                            <img src={`http://127.0.0.1:5000/api/stock/${displayStock}/graph`} alt="Stock Graph" />
                        </div>


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
};

export default HomePage;

