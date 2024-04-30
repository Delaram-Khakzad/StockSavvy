//reference design:
import React, { useState } from 'react';


function StockGraphForm() {
    const dateRangeOptions = ['Last Day', 'Last Week', 'Last Month', 'Past 6 Months', 'Past Year', 'Custom'];

    const [stockSymbol, setStockSymbol] = useState('');
    const [dateRange, setDateRange] = useState(dateRangeOptions[0]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleDateRangeChange = (event) => {
        setDateRange(event.target.value);
        if (event.target.value === 'Custom') {
            document.getElementById('custom_dates').style.display = 'block';
        } else {
            document.getElementById('custom_dates').style.display = 'none';
        }
    }

    return (
        <form action="https://stocksavvy.calebweb.me:8123/plot" method="post">
            <label for="stock_symbol">Enter Stock Symbol:</label>
            <input type="text" id="stock_symbol" name="stock_symbol" required></input>

            <label for="date_range">Select Date Range:</label>
            <select name="date_range" id="date_range">
                {dateRangeOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            <div id="custom_dates" style={{display: 'none'}}>
                <label for="start_date">Start Date:</label>
                <input type="date" id="start_date" name="start_date"></input>
                <label for="end_date">End Date:</label>
                <input type="date" id="end_date" name="end_date"></input>
            </div>
            <button type="submit">Plot</button>
        </form>
    )
};

export default StockGraphForm;