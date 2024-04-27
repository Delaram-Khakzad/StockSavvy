import React from 'react';
import StockDetails from './StockDetails';

function StockList({ symbols }) {
    // display stocks in a row
    return (
        <div style={{ backgroundColor: 'aliceblue' }}>

            {symbols.map(symbol => {
                return (<div key={symbol}>
                    <StockDetails symbol={symbol} />
                </div>
                )
            })}

        </div>
    );
}

export default StockList;