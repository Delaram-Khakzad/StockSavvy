# provides information about stocks (price, change, percent change) and recommendations for stocks.
if __name__ == '__main__':
    print("This app should be included in the main app.py file")
    exit(1)

from flask import jsonify
import yfinance as yf
from datetime import datetime

from functools import cache

from sandp import SandP500

sp500 = SandP500('../datasets/sp500_companies.csv')

# returns all known stock symbols
def get_symbols(count=1):
    if count > 500:
        return jsonify({'error': 'Count must be less than 500'}), 400
    return jsonify(sp500.symbols()[:count])

# expected form of the output is a dict:
# {
# 'symbol': 'AAPL',
# 'name': 'Apple Inc.',
# 'price': 150.23,
# 'change': 1.23,
# 'percent_change': 0.5
# }
def get_stock(symbol):
    try:
        data = yf.download(symbol, period='2d')
    except KeyError:
        return jsonify({'error': 'Yahoo finance API is weird'}), 400

    if data is None:
        return jsonify({'error': 'Unknown stock symbol'}), 400
    try: 
        stock_full_name = sp500.get_data().loc[symbol, 'Longname']
    except KeyError:
        return jsonify({'error': 'Unknown stock symbol'}), 400
    yesterday = data.tail(2).head(1)
    today = data.tail(1)
    data = {
        'symbol': symbol,
        'name': stock_full_name,
        'price': today['Close'].values[0],
        'change': today['Close'].values[0] - yesterday['Close'].values[0],
        'percent_change': (today['Close'].values[0] - yesterday['Close'].values[0]) / yesterday['Close'].values[0]
    }
    return jsonify(data)

def summary(symbol):
    return jsonify(sp500.get_data().loc[symbol]['Longbusinesssummary'])


