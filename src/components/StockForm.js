import React, { useState } from 'react';

function StockForm({ onSubmit }) {
    const [symbol, setSymbol] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(symbol);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Enter stock symbol" />
            <button type="submit">Get Recommendations</button>
        </form>
    );
}

export default StockForm;