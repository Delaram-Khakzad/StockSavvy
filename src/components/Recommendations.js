import React from 'react';

function Recommendations({ recommendations }) {
    return (
        <div>
            <h2>Recommended Stocks</h2>
            <ul>
                {recommendations.map((stock) => (
                    <li key={stock.symbol}>{stock.name} - {stock.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default Recommendations;