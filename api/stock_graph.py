if __name__ == '__main__':
    print("This app should be included in the main app.py file")
    exit(1)

from flask import request, send_file
import yfinance as yf
import matplotlib.pyplot as plt
import pandas as pd
from datetime import datetime, timedelta
import io

import matplotlib
matplotlib.use('agg')

from functools import cache

from __main__ import app

@cache
def download_data(stock_symbol):
    return yf.download(stock_symbol)

# @app.route('/', methods=['GET'])
# def index():
#     # Form for date range and stock symbol selection
#     return '''
#         <form action="/plot" method="post">
#             <label for="stock_symbol">Enter Stock Symbol:</label>
#             <input type="text" id="stock_symbol" name="stock_symbol" required>

#             <label for="date_range">Select Date Range:</label>
#             <select name="date_range" id="date_range">
#                 <option value="Last Day">Last Day</option>
#                 <option value="Last Week">Last Week</option>
#                 <option value="Last Month">Last Month</option>
#                 <option value="Past 6 Months">Past 6 Months</option>
#                 <option value="Past Year">Past Year</option>
#                 <option value="Custom">Custom</option>
#             </select>
#             <div id="custom_dates" style="display:none;">
#                 <label for="start_date">Start Date:</label>
#                 <input type="date" id="start_date" name="start_date">
#                 <label for="end_date">End Date:</label>
#                 <input type="date" id="end_date" name="end_date">
#             </div>
#             <button type="submit">Plot</button>
#         </form>
#         <script>
#             document.getElementById('date_range').addEventListener('change', function() {
#                 if (this.value === 'Custom') {
#                     document.getElementById('custom_dates').style.display = 'block';
#                 } else {
#                     document.getElementById('custom_dates').style.display = 'none';
#                 }
#             });
#         </script>
#     '''

@app.route('/api/plot', methods=['POST'])
def plot_stock_price():
    stock_symbol = request.form['stock_symbol']
    date_range = request.form['date_range']
    today = datetime.now()

    # Download data only after getting the symbol
    full_data = download_data(stock_symbol)

    if date_range == 'Last Day':
        start_date = today - timedelta(days=1)
    elif date_range == 'Last Week':
        start_date = today - timedelta(weeks=1)
    elif date_range == 'Last Month':
        start_date = today - timedelta(days=30)
    elif date_range == 'Past 6 Months':
        start_date = today - timedelta(days=183)
    elif date_range == 'Past Year':
        start_date = today - timedelta(days=365)
    elif date_range == 'Custom':
        start_date = request.form['start_date']
        end_date = request.form['end_date']
        start_date = datetime.fromisoformat(start_date) if start_date else None
        end_date = datetime.fromisoformat(end_date) if end_date else None
        if not start_date or not end_date:
            return "Please select a start and end date."
    else:
        start_date = today - timedelta(days=365)  # Default to 'Past Year'
        end_date = today

    # Ensuring valid end date
    end_date = today if date_range != 'Custom' else end_date

    # Selecting the data within the specified date range
    data = full_data.loc[start_date:end_date]

    # Plotting
    _, ax = plt.subplots(figsize=(10, 5))
    ax.plot(data['Close'], label='Close Price')
    ax.set_title(f"Stock Close Price for {stock_symbol} ({start_date.strftime('%Y-%m-%d')} to {end_date.strftime('%Y-%m-%d')})")
    ax.set_xlabel('Date')
    ax.set_ylabel('Price (USD)')
    ax.legend()
    ax.grid(True)

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    return send_file(img, mimetype='image/png')


