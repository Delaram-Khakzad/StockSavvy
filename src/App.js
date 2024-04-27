// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecommendationPage from './components/RecommendationPage';
import StockInformationPage from './components/StockInformationPage';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recommendation" element={<RecommendationPage />} />
                <Route path="/stock-info" element={<StockInformationPage />} />
            </Routes>
        </Router>
    );
}

export default App;
