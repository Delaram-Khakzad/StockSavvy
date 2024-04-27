import React from 'react';
import '../styles/RecommendationPage.css';

function RecommendationList({ recommendations }) {
    return (
        <div>
            <ul>
                {recommendations.map(stock => (
                    <li key={stock.symbol}>{stock.name} - {stock.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default RecommendationList;